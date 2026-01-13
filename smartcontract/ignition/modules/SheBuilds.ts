import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const SheBuildsModule = buildModule("SheBuildsModule", (m) => {
    const sheBuilds = m.contract("SheBuilds");

    return { sheBuilds };
});

export default SheBuildsModule;
