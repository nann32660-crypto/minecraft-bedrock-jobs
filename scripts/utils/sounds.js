import { world } from "@minecraft/server";

/**
 * 소리 효과 모음
 */
export const SoundEffects = {
  /**
   * 일반 공격 소리
   */
  attackSound(dimension, position) {
    dimension.playSound("mob.zombie.attack", position, { volume: 1.0, pitch: 1.0 });
  },

  /**
   * 강한 공격 소리
   */
  heavyAttackSound(dimension, position) {
    dimension.playSound("mob.wither.attack", position, { volume: 1.2, pitch: 0.8 });
  },

  /**
   * 화살 쏘는 소리
   */
  arrowSound(dimension, position) {
    dimension.playSound("random.bow", position, { volume: 1.0, pitch: 1.0 });
  },

  /**
   * 마법 시전 소리
   */
  magicSound(dimension, position) {
    dimension.playSound("random.pop", position, { volume: 1.0, pitch: 1.2 });
  },

  /**
   * 폭발 소리
   */
  explosionSound(dimension, position) {
    dimension.playSound("random.explode", position, { volume: 1.5, pitch: 1.0 });
  },

  /**
   * 치유 소리
   */
  healSound(dimension, position) {
    dimension.playSound("random.pop", position, { volume: 0.8, pitch: 1.5 });
  },

  /**
   * 버프 소리
   */
  buffSound(dimension, position) {
    dimension.playSound("random.levelup", position, { volume: 1.0, pitch: 1.0 });
  },

  /**
   * 데미지 소리
   */
  damageSound(dimension, position) {
    dimension.playSound("mob.wither.hurt", position, { volume: 1.0, pitch: 1.0 });
  },

  /**
   * 텔레포트 소리
   */
  teleportSound(dimension, position) {
    dimension.playSound("mob.endermen.portal", position, { volume: 1.0, pitch: 1.0 });
  },

  /**
   * 차원이동 소리 (드래곤처럼)
   */
  dimensionSound(dimension, position) {
    dimension.playSound("mob.dragon.wings", position, { volume: 1.0, pitch: 1.0 });
  },

  /**
   * 대기 중인 소리 (준비 중)
   */
  readySound(dimension, position) {
    dimension.playSound("random.click", position, { volume: 0.8, pitch: 1.2 });
  },

  /**
   * 쿨타임 완료 소리
   */
  cooldownCompleteSound(dimension, position) {
    dimension.playSound("random.ding", position, { volume: 1.0, pitch: 1.2 });
  },

  /**
   * 전투 준비 소리
   */
  battleSound(dimension, position) {
    dimension.playSound("mob.wither.ambient", position, { volume: 1.2, pitch: 1.0 });
  }
};

export default SoundEffects;
