import { world } from "@minecraft/server";
import { ParticleEffects } from "../../utils/particles.js";
import { SoundEffects } from "../../utils/sounds.js";
import { AbilitySystem } from "../../systems/abilitySystem.js";
import { CooldownSystem } from "../../systems/cooldownSystem.js";

/**
 * 도적 직업 능력
 * 패시브: 신속 1
 * 능력 1: 은신 (3초, 쿨 2분30초)
 */
export class RogueAbilities {
  static JOB_NAME = "rogue";

  /**
   * 패시브 능력 적용
   */
  static applyPassive(player) {
    // 신속 1
    player.addEffect("speed", 3, { amplifier: 0, showParticles: false });
  }

  /**
   * 능력 1: 은신
   * 3초간 투명화, 이후 30초간 신속 해제
   */
  static invisibility(player) {
    const pos = player.location;

    // 은신 이펙트
    ParticleEffects.invisibilityEffect(player.dimension, player);

    // 3초(60틱) 투명화
    player.addEffect("invisibility", 60, { amplifier: 0 });

    // 소리 효과
    SoundEffects.magicSound(player.dimension, pos);

    // 3초 후 신속 제거 (스케줄링)
    world.afterEvents.worldInitialize.subscribe(() => {
      // 3초(60틱) 후 신속 풀림
      setTimeout(() => {
        if (player.isValid()) {
          player.removeEffect("speed");
          player.sendMessage("§c신속이 풀렸습니다!");
        }
      }, 3000);
    });

    // 쿨타임 2분30초 (150초)
    AbilitySystem.setAbilityCooldown(player, this.JOB_NAME, 1, 150);
    
    player.sendMessage("§a은신을 사용했습니다!");
  }

  /**
   * 능력 등록
   */
  static registerAbilities() {
    AbilitySystem.registerAbility(this.JOB_NAME, 1, (player) => this.invisibility(player));
  }
}

export default RogueAbilities;