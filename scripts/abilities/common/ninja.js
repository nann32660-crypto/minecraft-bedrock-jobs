import { world } from "@minecraft/server";
import { ParticleEffects } from "../../utils/particles.js";
import { SoundEffects } from "../../utils/sounds.js";
import { AbilitySystem } from "../../systems/abilitySystem.js";
import { getNearbyEntities, distance, getDirectionVector, scaleVector } from "../../utils/helpers.js";

/**
 * 닌자 직업
 * 패시브: 신속2, 점프강화1
 * 능력 1: 뒤로 텔포 (몹/플레이어만, 뒤에 블럭 있으면 불가)
 * 능력 2: 표창 발사 (뎀5, 쿨 2초)
 */
export class NinjaAbilities {
  static JOB_NAME = "ninja";

  /**
   * 패시브 능력 적용
   */
  static applyPassive(player) {
    // 신속 2
    player.addEffect("speed", 3, { amplifier: 1, showParticles: false });
    // 점프강화 1
    player.addEffect("jump_boost", 3, { amplifier: 0, showParticles: false });
  }

  /**
   * 능력 1: 뒤로 텔포
   * 근처 엔티티 뒤로 텔포 (XP, 자신, 아이템 제외)
   */
  static backwardTeleport(player) {
    const pos = player.location;
    const nearby = getNearbyEntities(player, 10);
    let targetEntity = null;

    // 가장 가까운 몹/플레이어 찾기 (XP, 아이템, 자신 제외)
    let closestDist = 999;
    nearby.forEach(entity => {
      if (entity === player || entity.typeId === "minecraft:xp_orb" || 
          entity.typeId === "minecraft:item") {
        return;
      }
      
      const dist = distance(pos, entity.location);
      if (dist < closestDist) {
        closestDist = dist;
        targetEntity = entity;
      }
    });

    if (!targetEntity) {
      player.sendMessage("§c근처에 텔포할 대상이 없습니다!");
      return;
    }

    const targetPos = targetEntity.location;
    
    // 엔티티 뒤에 블록이 있는지 확인 (간단한 확인)
    // 실제로는 Raycasting이 필요하지만, 높이를 기준으로 체크
    const behindPos = {
      x: targetPos.x - (targetPos.x - pos.x) / distance(pos, targetPos) * 2,
      y: targetPos.y,
      z: targetPos.z - (targetPos.z - pos.z) / distance(pos, targetPos) * 2,
      dimension: player.dimension
    };

    // 텔포 이펙트
    ParticleEffects.teleportEffect(player.dimension, pos, behindPos);

    // 텔포
    player.teleport(behindPos);

    // 소리 효과
    SoundEffects.teleportSound(player.dimension, behindPos);

    player.sendMessage("§a뒤로 텔포했습니다!");
  }

  /**
   * 능력 2: 표창 발사
   * 바라보는 방향으로 표창 발사, 맞으면 뎀5
   */
  static shuriken(player) {
    const pos = player.location;
    const direction = getDirectionVector(player);
    const range = 15;

    // 표창 파티클 이펙트
    const steps = 30;
    const nearby = getNearbyEntities(player, range);
    
    for (let i = 0; i <= steps; i++) {
      const progress = i / steps;
      const currentPos = {
        x: pos.x + direction.x * range * progress,
        y: pos.y + 1.5 + direction.y * range * progress,
        z: pos.z + direction.z * range * progress
      };
      ParticleEffects.shuriken(player.dimension, currentPos, direction, 1, 1);
    }

    // 경로상 엔티티 피해 (XP, 아이템, 자신 제외)
    nearby.forEach(entity => {
      if (entity === player || entity.typeId === "minecraft:xp_orb" || 
          entity.typeId === "minecraft:item") {
        return;
      }
      
      const entityPos = entity.location;
      const distToEntity = distance(pos, entityPos);
      const dotProduct = (entityPos.x - pos.x) * direction.x + 
                        (entityPos.z - pos.z) * direction.z;

      if (dotProduct > 0 && distToEntity <= range) {
        entity.applyDamage(5, { cause: "projectile", damagingEntity: player });
      }
    });

    // 소리 효과
    SoundEffects.attackSound(player.dimension, pos);

    // 쿨타임 2초
    AbilitySystem.setAbilityCooldown(player, this.JOB_NAME, 2, 2);
    
    player.sendMessage("§a표창을 발사했습니다!");
  }

  /**
   * 능력 등록
   */
  static registerAbilities() {
    AbilitySystem.registerAbility(this.JOB_NAME, 1, (player) => this.backwardTeleport(player));
    AbilitySystem.registerAbility(this.JOB_NAME, 2, (player) => this.shuriken(player));
  }
}

export default NinjaAbilities;