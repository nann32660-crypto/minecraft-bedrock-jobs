import PlayerData from "../utils/playerData.js";

/**
 * 쿨타임 시스템
 */
export class CooldownSystem {
  /**
   * 능력 쿨타임 설정
   */
  static setCooldown(player, jobName, abilityNumber, seconds) {
    const key = `cooldown_${jobName}_ability_${abilityNumber}`;
    const expiryTime = Date.now() + seconds * 1000;
    player.setDynamicProperty(key, expiryTime);
  }

  /**
   * 남은 쿨타임 조회 (초 단위)
   */
  static getRemainingCooldown(player, jobName, abilityNumber) {
    const key = `cooldown_${jobName}_ability_${abilityNumber}`;
    const expiryTime = player.getDynamicProperty(key);
    
    if (!expiryTime) return 0;
    
    const remaining = (expiryTime - Date.now()) / 1000;
    return Math.max(0, remaining);
  }

  /**
   * 쿨타임 준비 여부 확인
   */
  static isReady(player, jobName, abilityNumber) {
    return this.getRemainingCooldown(player, jobName, abilityNumber) <= 0;
  }

  /**
   * 쿨타임 초기화
   */
  static clearCooldown(player, jobName, abilityNumber) {
    const key = `cooldown_${jobName}_ability_${abilityNumber}`;
    player.removeDynamicProperty(key);
  }

  /**
   * 모든 쿨타임 초기화
   */
  static clearAllCooldowns(player, jobName) {
    for (let i = 1; i <= 3; i++) {
      this.clearCooldown(player, jobName, i);
    }
  }

  /**
   * 쿨타임 문자열 포맷 (예: "1.5초")
   */
  static formatCooldown(seconds) {
    if (seconds <= 0) return "준비됨";
    if (seconds < 1) return `${(seconds * 1000).toFixed(0)}ms`;
    return `${seconds.toFixed(1)}초`;
  }
}

export default CooldownSystem;