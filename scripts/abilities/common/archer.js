import { world } from "@minecraft/server";

/**
 * 궁수 직업 패시브
 * 패시브: 나약함 1, 속도 2, 점프강화 1
 */
export class ArcherAbilities {
  static JOB_NAME = "archer";

  /**
   * 패시브 능력 적용
   */
  static applyPassive(player) {
    // 나약함 1
    player.addEffect("weakness", 3, { amplifier: 0, showParticles: false });
    // 속도 2
    player.addEffect("speed", 3, { amplifier: 1, showParticles: false });
    // 점프강화 1
    player.addEffect("jump_boost", 3, { amplifier: 0, showParticles: false });
  }

  /**
   * 패시브 활성화
   */
  static registerAbilities() {
    console.log(`${this.JOB_NAME} passive registered`);
  }
}

export default ArcherAbilities;