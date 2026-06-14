import { world } from "@minecraft/server";

/**
 * 검사 직업 패시브
 * 패시브: 힘 1
 */
export class SwordsmanAbilities {
  static JOB_NAME = "swordsman";

  /**
   * 패시브 능력 적용
   */
  static applyPassive(player) {
    // 힘 1 부여 (60틱 = 3초마다 갱신)
    player.addEffect("strength", 3, { amplifier: 0, showParticles: false });
  }

  /**
   * 패시브 활성화
   */
  static registerAbilities() {
    // 검사는 패시브만 있음
    console.log(`${this.JOB_NAME} passive registered`);
  }
}

export default SwordsmanAbilities;