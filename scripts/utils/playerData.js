import { world } from "@minecraft/server";

/**
 * 플레이어 데이터 관리 (DynamicProperties 사용)
 */
export class PlayerData {
  /**
   * 쿨타임 저장 (초 단위)
   * 나갔다가 와도 유지됨
   */
  static setCooldown(player, abilityName, seconds) {
    const key = `cooldown_${abilityName}`;
    const expiryTime = Date.now() + seconds * 1000;
    player.setDynamicProperty(key, expiryTime);
  }

  /**
   * 쿨타임 조회 (남은 시간 초 단위)
   */
  static getRemainingCooldown(player, abilityName) {
    const key = `cooldown_${abilityName}`;
    const expiryTime = player.getDynamicProperty(key);
    
    if (!expiryTime) return 0;
    
    const remaining = (expiryTime - Date.now()) / 1000;
    return Math.max(0, remaining);
  }

  /**
   * 쿨타임 확인 (사용 가능한가?)
   */
  static isCooldownReady(player, abilityName) {
    return this.getRemainingCooldown(player, abilityName) <= 0;
  }

  /**
   * 쿨타임 초기화
   */
  static clearCooldown(player, abilityName) {
    const key = `cooldown_${abilityName}`;
    player.removeDynamicProperty(key);
  }

  /**
   * 능력 레벨 저장
   */
  static setAbilityLevel(player, abilityName, level) {
    const key = `ability_level_${abilityName}`;
    player.setDynamicProperty(key, level);
  }

  /**
   * 능력 레벨 조회
   */
  static getAbilityLevel(player, abilityName) {
    const key = `ability_level_${abilityName}`;
    const level = player.getDynamicProperty(key);
    return level || 1; // 기본값: 레벨 1
  }

  /**
   * 현재 선택된 능력 저장
   */
  static setSelectedAbility(player, jobName, abilityIndex) {
    const key = `selected_ability_${jobName}`;
    player.setDynamicProperty(key, abilityIndex);
  }

  /**
   * 현재 선택된 능력 조회
   */
  static getSelectedAbility(player, jobName) {
    const key = `selected_ability_${jobName}`;
    const index = player.getDynamicProperty(key);
    return index || 1; // 기본값: 능력 1
  }

  /**
   * 플레이어 상태 저장 (일반)
   */
  static setData(player, key, value) {
    player.setDynamicProperty(key, value);
  }

  /**
   * 플레이어 상태 조회 (일반)
   */
  static getData(player, key) {
    return player.getDynamicProperty(key);
  }

  /**
   * 플레이어 상태 삭제
   */
  static removeData(player, key) {
    player.removeDynamicProperty(key);
  }

  /**
   * 플레이어의 모든 데이터 초기화
   */
  static clearPlayerData(player) {
    const keysToRemove = [];
    
    // 모든 직업 쿨타임 초기화
    const jobs = ["swordsman", "archer", "rogue", "robot", "darkDestroyer", "ninja", "tanker", "warlock", "angel", "mercenary", "dragonWarrior"];
    
    jobs.forEach(job => {
      player.removeDynamicProperty(`cooldown_${job}_ability_1`);
      player.removeDynamicProperty(`cooldown_${job}_ability_2`);
      player.removeDynamicProperty(`cooldown_${job}_ability_3`);
      player.removeDynamicProperty(`selected_ability_${job}`);
      player.removeDynamicProperty(`ability_level_${job}_ability_1`);
      player.removeDynamicProperty(`ability_level_${job}_ability_2`);
      player.removeDynamicProperty(`ability_level_${job}_ability_3`);
    });
  }
}

export default PlayerData;
