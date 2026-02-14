// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/introspection/ERC165.sol";

interface ISoulbound is IERC165 {
    event SoulboundTransferAttempt(
        address indexed from,
        address indexed to,
        uint256 indexed tokenId
    );
}

contract SheBuildsNFT is ERC721, AccessControl, ISoulbound {
    bytes32 public constant ISSUER_ROLE = keccak256("ISSUER_ROLE");
    bytes32 public constant ADMIN_ROLE = keccak256("ADMIN_ROLE");

    uint256 private _tokenIdCounter;

    struct Credential {
        string skillCategory;
        uint8 proficiency;
        string metadataURI;
        address issuer;
        uint256 issuedAt;
        bool revoked;
    }

    mapping(uint256 => Credential) public credentials;

    event CredentialIssued(
        uint256 indexed tokenId,
        address indexed recipient,
        string skillCategory,
        uint8 proficiency,
        address indexed issuer
    );

    event CredentialRevoked(
        uint256 indexed tokenId,
        address indexed issuer,
        string reason
    );

    error TokenIsSoulbound();
    error NotAuthorized();
    error InvalidProficiency();
    error TokenDoesNotExist();
    error TokenAlreadyRevoked();

    constructor(address admin) ERC721("SheBuilds Skill NFT", "SBSNFT") {
        _grantRole(ADMIN_ROLE, admin);
        _grantRole(ISSUER_ROLE, admin);
        _grantRole(DEFAULT_ADMIN_ROLE, admin);
    }

    function supportsInterface(
        bytes4 interfaceId
    ) public view override(ERC721, AccessControl, IERC165) returns (bool) {
        return
            interfaceId == type(ISoulbound).interfaceId ||
            super.supportsInterface(interfaceId);
    }

    function grantIssuerRole(address issuer) external onlyRole(ADMIN_ROLE) {
        _grantRole(ISSUER_ROLE, issuer);
    }

    function revokeIssuerRole(address issuer) external onlyRole(ADMIN_ROLE) {
        _revokeRole(ISSUER_ROLE, issuer);
    }

    function mintCredential(
        address recipient,
        string calldata skillCategory,
        uint8 proficiency,
        string calldata metadataURI
    ) external onlyRole(ISSUER_ROLE) returns (uint256) {
        if (proficiency > 5) revert InvalidProficiency();

        uint256 tokenId = _tokenIdCounter++;
        _safeMint(recipient, tokenId);

        credentials[tokenId] = Credential({
            skillCategory: skillCategory,
            proficiency: proficiency,
            metadataURI: metadataURI,
            issuer: msg.sender,
            issuedAt: block.timestamp,
            revoked: false
        });

        emit CredentialIssued(
            tokenId,
            recipient,
            skillCategory,
            proficiency,
            msg.sender
        );

        return tokenId;
    }

    function batchMintCredentials(
        address[] calldata recipients,
        string[] calldata skillCategories,
        uint8[] calldata proficiencies,
        string[] calldata metadataURIs
    ) external onlyRole(ISSUER_ROLE) returns (uint256[] memory) {
        uint256 length = recipients.length;
        require(
            length == skillCategories.length &&
                length == proficiencies.length &&
                length == metadataURIs.length,
            "Array length mismatch"
        );

        uint256[] memory tokenIds = new uint256[](length);

        for (uint256 i = 0; i < length; i++) {
            tokenIds[i] = mintCredential(
                recipients[i],
                skillCategories[i],
                proficiencies[i],
                metadataURIs[i]
            );
        }

        return tokenIds;
    }

    function revokeCredential(
        uint256 tokenId,
        string calldata reason
    ) external onlyRole(ISSUER_ROLE) {
        if (_ownerOf(tokenId) == address(0)) revert TokenDoesNotExist();
        if (credentials[tokenId].revoked) revert TokenAlreadyRevoked();
        if (credentials[tokenId].issuer != msg.sender)
            revert NotAuthorized();

        credentials[tokenId].revoked = true;

        emit CredentialRevoked(tokenId, msg.sender, reason);
    }

    function getCredential(
        uint256 tokenId
    )
        external
        view
        returns (
            string memory skillCategory,
            uint8 proficiency,
            string memory metadataURI,
            address issuer,
            uint256 issuedAt,
            bool revoked
        )
    {
        if (_ownerOf(tokenId) == address(0)) revert TokenDoesNotExist();

        Credential memory cred = credentials[tokenId];
        return (
            cred.skillCategory,
            cred.proficiency,
            cred.metadataURI,
            cred.issuer,
            cred.issuedAt,
            cred.revoked
        );
    }

    function getCredentialsByOwner(
        address owner
    ) external view returns (uint256[] memory) {
        uint256 balance = balanceOf(owner);
        uint256[] memory tokens = new uint256[](balance);
        uint256 index = 0;

        for (uint256 i = 0; i < _tokenIdCounter && index < balance; i++) {
            if (_ownerOf(i) == owner) {
                tokens[index] = i;
                index++;
            }
        }

        return tokens;
    }

    function totalSupply() external view returns (uint256) {
        return _tokenIdCounter;
    }

    function _update(
        address to,
        uint256 tokenId,
        address auth
    ) internal virtual override returns (address) {
        address from = _ownerOf(tokenId);

        if (from != address(0) && to != address(0)) {
            emit SoulboundTransferAttempt(from, to, tokenId);
            revert TokenIsSoulbound();
        }

        return super._update(to, tokenId, auth);
    }
}