import { world } from "@minecraft/server";
import { ParticleEffects } from "../../utils/particles.js";
import { SoundEffects } from "../../utils/sounds.js";
import { AbilitySystem } from "../../systems/abilitySystem.js";
import { getDirectionVector, scaleVector, getNearbyEntities, distance } from "../../utils/helpers.js";

/**
 * 로봇 직업 능력
 * 능력 1: 레이저 발사
 * - 뎀: 10
 * - 거리: 15칸
 * - 쿨: 3초
 */
export class RobotAbilities {
  static JOB_NAME = "robot";

  /**
   * 능력 1: 레이저 발사
   */
  static laser(player) {
    const pos = player.location;
    const direction = getDirectionVector(player);
    const scaledDir = scaleVector(direction, 15);
    const targetPos = {
      x: pos.x + scaledDir.x,
      y: pos.y + scaledDir.y,
      z: pos.z + scaledDir.z
    };

    // 레이저 파티클 효과 (불꽃으로 표현)
    const steps = 30; // 15칸 = 약 30 파티클
    for (let i = 0; i <= steps; i++) {
      const progress = i / steps;
      const currentPos = {
        x: pos.x + (targetPos.x - pos.x) * progress,
        y: pos.y + (targetPos.y - pos.y) * progress,
        z: pos.z + (targetPos.z - pos.z) * progress
      };
      ParticleEffects.laserEffect(player.dimension, currentPos, currentPos, "minecraft:flame");
    }

    // 경로상 모든 엔티티에 피해
    const nearby = getNearbyEntities(player, 15);
    nearby.forEach(entity => {
      const entityPos = entity.location;
      const distToEntity = distance(pos, entityPos);
      const dotProduct = (entityPos.x - pos.x) * direction.x + 
                        (entityPos.z - pos.z) * direction.z;

      // 플레이어가 보는 방향 앞에 있는 엔티티만 피해
      if (dotProduct > 0 && distToEntity <= 15) {
        entity.applyDamage(10, { cause: "projectile", damagingEntity: player });
      }
    });

    // 소리 효과
    SoundEffects.battleSound(player.dimension, pos);

    // 쿨타임 3초
    AbilitySystem.setAbilityCooldown(player, this.JOB_NAME, 1, 3);
    
    player.sendMessage("§a레이저를 발사했습니다!");
  }

  /**
   * 능력 등록
   */
  static registerAbilities() {
    AbilitySystem.registerAbility(this.JOB_NAME, 1, (player) => this.laser(player));
  }
}

export default RobotAbilities;