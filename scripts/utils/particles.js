import { world } from "@minecraft/server";

/**
 * 파티클 효과 모음
 */
export const ParticleEffects = {
  /**
   * 원형 파티클
   */
  circleParticle(dimension, center, radius, particleType, color = null) {
    const steps = 16;
    for (let i = 0; i < steps; i++) {
      const angle = (i / steps) * Math.PI * 2;
      const x = center.x + Math.cos(angle) * radius;
      const z = center.z + Math.sin(angle) * radius;
      
      const particle = {
        x: x,
        y: center.y,
        z: z
      };
      
      dimension.spawnParticle(particleType, particle);
    }
  },

  /**
   * 히트 이펙트
   */
  hitEffect(dimension, position) {
    dimension.spawnParticle("minecraft:critical_hit", position);
    dimension.spawnParticle("minecraft:slime_particle", position);
  },

  /**
   * 마법 이펙트
   */
  magicEffect(dimension, position, color = "blue") {
    if (color === "blue") {
      dimension.spawnParticle("minecraft:endrod", position);
    } else if (color === "red") {
      dimension.spawnParticle("minecraft:redstone_particle", position);
    } else if (color === "yellow") {
      dimension.spawnParticle("minecraft:sparkler", position);
    } else if (color === "black") {
      dimension.spawnParticle("minecraft:witch_spell_particle", position);
    }
  },

  /**
   * 힐 이펙트
   */
  healEffect(dimension, position) {
    dimension.spawnParticle("minecraft:heart_particle", position);
  },

  /**
   * 독 이펙트
   */
  poisonEffect(dimension, position) {
    dimension.spawnParticle("minecraft:poison_particle", position);
  },

  /**
   * 망상 이펙트
   */
  confusionEffect(dimension, position) {
    dimension.spawnParticle("minecraft:witch_spell_particle", position);
  },

  /**
   * 폭발 이펙트
   */
  explosionEffect(dimension, position) {
    dimension.spawnParticle("minecraft:explosion_particle", position);
    dimension.spawnParticle("minecraft:explosion_emitter", position);
  },

  /**
   * 레이저 이펙트
   */
  laserEffect(dimension, startPos, endPos, particleType = "minecraft:sparkler") {
    const dx = endPos.x - startPos.x;
    const dy = endPos.y - startPos.y;
    const dz = endPos.z - startPos.z;
    
    const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);
    const steps = Math.floor(distance * 2);
    
    for (let i = 0; i <= steps; i++) {
      const progress = steps > 0 ? i / steps : 0;
      const particle = {
        x: startPos.x + dx * progress,
        y: startPos.y + dy * progress,
        z: startPos.z + dz * progress
      };
      
      dimension.spawnParticle(particleType, particle);
    }
  },

  /**
   * 표창 이펙트 (움직이는)
   */
  shuriken(dimension, startPos, direction, distance, steps = 20) {
    const dx = direction.x * distance;
    const dy = direction.y * distance;
    const dz = direction.z * distance;
    
    for (let i = 0; i <= steps; i++) {
      const progress = steps > 0 ? i / steps : 0;
      const particle = {
        x: startPos.x + dx * progress,
        y: startPos.y + dy * progress,
        z: startPos.z + dz * progress
      };
      
      dimension.spawnParticle("minecraft:endrod", particle);
    }
  },

  /**
   * 드래곤 브레스 이펙트
   */
  dragonBreath(dimension, startPos, direction, distance) {
    const steps = Math.floor(distance * 2);
    const dx = direction.x * distance;
    const dy = direction.y * distance;
    const dz = direction.z * distance;
    
    for (let i = 0; i <= steps; i++) {
      const progress = steps > 0 ? i / steps : 0;
      const particle = {
        x: startPos.x + dx * progress,
        y: startPos.y + dy * progress,
        z: startPos.z + dz * progress
      };
      
      dimension.spawnParticle("minecraft:dragon_breath", particle);
      
      // 양옆 파티클
      if (i % 2 === 0) {
        const sideX = startPos.x + dx * progress + Math.random() - 0.5;
        const sideY = startPos.y + dy * progress + Math.random() - 0.5;
        const sideZ = startPos.z + dz * progress + Math.random() - 0.5;
        dimension.spawnParticle("minecraft:dragon_breath", { x: sideX, y: sideY, z: sideZ });
      }
    }
  },

  /**
   * 워든 음파 이펙트
   */
  wardenWave(dimension, center) {
    const maxRadius = 4;
    const steps = 8;
    
    for (let i = 1; i <= steps; i++) {
      const radius = (i / steps) * maxRadius;
      this.circleParticle(dimension, center, radius, "minecraft:endrod");
    }
  },

  /**
   * 은신 이펙트
   */
  invisibilityEffect(dimension, player) {
    const pos = player.location;
    dimension.spawnParticle("minecraft:endrod", pos);
    dimension.spawnParticle("minecraft:portal", pos);
  },

  /**
   * 텔레포트 이펙트
   */
  teleportEffect(dimension, fromPos, toPos) {
    dimension.spawnParticle("minecraft:endrod", fromPos);
    dimension.spawnParticle("minecraft:endrod", toPos);
    dimension.spawnParticle("minecraft:portal", fromPos);
    dimension.spawnParticle("minecraft:portal", toPos);
  }
};

export default ParticleEffects;
