import { world } from "@minecraft/server";

/**
 * 탱커 직업 패시브
 * 패시브: 저항1, 나약함1, 속도저하1, 체력강화2, 걸림
 */
export class TankerAbilities {
  static JOB_NAME = "tanker";

  /**
   * 패시브 능력 적용
   */
  static applyPassive(player) {
    // 저항 1
    player.addEffect("resistance", 3, { amplifier: 0, showParticles: false });
    // 나약함 1
    player.addEffect("weakness", 3, { amplifier: 0, showParticles: false });
    // 속도저하 1
    player.addEffect("slowness", 3, { amplifier: 0, showParticles: false });
    // 체력강화 2
    player.addEffect("health_boost", 3, { amplifier: 1, showParticles: false });
    // 걸림 (굼뜬 하강)
    player.addEffect("slowness", 3, { amplifier: 1, showParticles: false });
  }

  /**
   * 패시브 활성화
   */
  static registerAbilities() {
    console.log(`${this.JOB_NAME} passive registered`);
  }
}

export default TankerAbilities;