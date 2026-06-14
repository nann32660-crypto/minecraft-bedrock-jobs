import { world } from "@minecraft/server";

/**
 * 직업 시스템
 */
export class JobSystem {
  static JOBS = {
    // 일반 직업
    SWORDSMAN: "swordsman",
    ARCHER: "archer",
    ROGUE: "rogue",
    ROBOT: "robot",
    DARK_DESTROYER: "darkDestroyer",
    NINJA: "ninja",
    TANKER: "tanker",
    // 히든 직업
    WARLOCK: "warlock",
    ANGEL: "angel",
    MERCENARY: "mercenary",
    DRAGON_WARRIOR: "dragonWarrior"
  };

  static COMMON_JOBS = [
    this.JOBS.SWORDSMAN,
    this.JOBS.ARCHER,
    this.JOBS.ROGUE,
    this.JOBS.ROBOT,
    this.JOBS.DARK_DESTROYER,
    this.JOBS.NINJA,
    this.JOBS.TANKER
  ];

  static HIDDEN_JOBS = [
    this.JOBS.WARLOCK,
    this.JOBS.ANGEL,
    this.JOBS.MERCENARY,
    this.JOBS.DRAGON_WARRIOR
  ];

  static ALL_JOBS = [...this.COMMON_JOBS, ...this.HIDDEN_JOBS];

  /**
   * 플레이어에게 직업 설정
   */
  static setJob(player, jobName) {
    if (!this.ALL_JOBS.includes(jobName)) {
      console.warn(`Unknown job: ${jobName}`);
      return false;
    }

    // 기존 직업 제거
    this.ALL_JOBS.forEach(job => {
      if (player.hasTag(job)) {
        player.removeTag(job);
      }
    });

    // 새 직업 추가
    player.addTag(jobName);
    console.log(`Player ${player.name} set job to ${jobName}`);
    return true;
  }

  /**
   * 플레이어의 현재 직업 가져오기
   */
  static getJob(player) {
    for (const job of this.ALL_JOBS) {
      if (player.hasTag(job)) {
        return job;
      }
    }
    return null;
  }

  /**
   * 플레이어가 특정 직업을 가지고 있는지 확인
   */
  static hasJob(player, jobName) {
    return player.hasTag(jobName);
  }

  /**
   * 직업 제거
   */
  static removeJob(player) {
    this.ALL_JOBS.forEach(job => {
      if (player.hasTag(job)) {
        player.removeTag(job);
      }
    });
  }

  /**
   * 직업 이름을 한글로 변환
   */
  static getJobNameKr(jobName) {
    const names = {
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
    return names[jobName] || jobName;
  }

  /**
   * 모든 직업 목록 반환
   */
  static getAllJobs() {
    return this.ALL_JOBS;
  }

  /**
   * 일반 직업만 반환
   */
  static getCommonJobs() {
    return this.COMMON_JOBS;
  }

  /**
   * 히든 직업만 반환
   */
  static getHiddenJobs() {
    return this.HIDDEN_JOBS;
  }

  /**
   * 직업이 히든 직업인지 확인
   */
  static isHiddenJob(jobName) {
    return this.HIDDEN_JOBS.includes(jobName);
  }

  /**
   * 직업이 일반 직업인지 확인
   */
  static isCommonJob(jobName) {
    return this.COMMON_JOBS.includes(jobName);
  }
}

export default JobSystem;
