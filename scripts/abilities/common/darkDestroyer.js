import { world, system } from "@minecraft/server";
import { ParticleEffects } from "../../utils/particles.js";
import { SoundEffects } from "../../utils/sounds.js";
import { AbilitySystem } from "../../systems/abilitySystem.js";
import { getNearbyEntities, distance } from "../../utils/helpers.js";

/**
 * 어둠의 파괴자 직업
 * 패시브: 아침에는 나약함1, 구속1 / 밤에는 힘1, 속도1
 * 능력 1: 워든 음파 (뎀14, 4칸, XP/아이템 제외)
 */
export class DarkDestroyerAbilities {
  static JOB_NAME = "darkDestroyer";

  /**
   * 패시브 능력 적용
   * 시간에 따라 다른 효과
   */
  static applyPassive(player) {
    const world = player.dimension.world;
    const time = world.getTime() % 24000; // 0-23999

    // 아침(0-12000): 나약함1, 구속1
    if (time < 12000) {
      player.addEffect("weakness", 3, { amplifier: 0, showParticles: false });
      player.addEffect("slowness", 3, { amplifier: 0, showParticles: false });
    }
    // 밤(12000-24000): 힘1, 속도1
    else {
      player.addEffect("strength", 3, { amplifier: 0, showParticles: false });
      player.addEffect("speed", 3, { amplifier: 0, showParticles: false });
    }
  }

  /**
   * 능력 1: 워든 음파
   * 4칸 범위 음파, 뎀14, XP/아이템 제외
   */
  static wardenWave(player) {
    const pos = player.location;
    const range = 4;

    // 워든 음파 파티클 이펙트
    ParticleEffects.wardenWave(player.dimension, pos);

    // 4칸 내 엔티티 피해 (XP, 아이템 제외)
    const nearby = getNearbyEntities(player, range);
    nearby.forEach(entity => {
      const entityPos = entity.location;
      const dist = distance(pos, entityPos);

      // XP나 아이템이 아닌 경우만
      if (dist <= range && entity.typeId !== "minecraft:xp_orb" && 
          entity.typeId !== "minecraft:item" && entity !== player) {
        entity.applyDamage(14, { cause: "entityAttack", damagingEntity: player });
      }
    });

    // 소리 효과
    SoundEffects.explosionSound(player.dimension, pos);

    // 쿨타임 220초
    AbilitySystem.setAbilityCooldown(player, this.JOB_NAME, 1, 220);
    
    player.sendMessage("§c워든 음파를 방출했습니다!");
  }

  /**
   * 능력 등록
   */
  static registerAbilities() {
    AbilitySystem.registerAbility(this.JOB_NAME, 1, (player) => this.wardenWave(player));
  }
}

export default DarkDestroyerAbilities;