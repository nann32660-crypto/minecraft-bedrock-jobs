import { world, system } from "@minecraft/server";
import PlayerData from "../utils/playerData.js";
import { SoundEffects } from "../utils/sounds.js";

/**
 * 능력 선택 시스템 (Shift + 우클릭)
 */
export class AbilitySelector {
  /**
   * 능력 선택 능력 개수 정의
   */
  static ABILITY_COUNTS = {
    swordsman: 1,
    archer: 1,
    rogue: 2,
    robot: 1,
    darkDestroyer: 1,
    ninja: 1,
    tanker: 1,
    warlock: 3,
    angel: 3,
    mercenary: 1,
    dragonWarrior: 3
  };

  /**
   * 능력 선택 변경
   */
  static changeAbility(player, jobName) {
    const maxAbilities = this.ABILITY_COUNTS[jobName];

    if (maxAbilities <= 1) {
      player.sendMessage("§c능력이 1개뿐이라 변경할 수 없습니다.");
      return;
    }

    let currentLevel = PlayerData.getSelectedAbility(player, jobName);

    let nextLevel = currentLevel + 1;
    if (nextLevel > maxAbilities) {
      nextLevel = 1;
    }

    PlayerData.setSelectedAbility(player, jobName, nextLevel);

    const jobNames = {
      swordsman: "검사",
      archer: "궁수",
      rogue: "도적",
      robot: "로봇",
      darkDestroyer: "어둠의 파괴자",
      ninja: "닌자",
      tanker: "탱커",
      warlock: "흑마법사",
      angel: "천사",
      mercenary: "용병",
      dragonWarrior: "용의 전사"
    };

    player.sendMessage(`§6능력 변경: ${jobNames[jobName]} 능력 ${nextLevel}번으로 변경됨!`);
    SoundEffects.readySound(player.dimension, player.location);
  }

  /**
   * 플레이어의 선택된 능력 번호 가져오기
   */
  static getSelectedAbilityNumber(player, jobName) {
    return PlayerData.getSelectedAbility(player, jobName);
  }

  /**
   * 능력이 여러 개인지 확인
   */
  static hasMultipleAbilities(jobName) {
    return this.ABILITY_COUNTS[jobName] > 1;
  }
}

export default AbilitySelector;
