import { world, system } from "@minecraft/server";
import JobSystem from "./jobSystem.js";
import { CooldownSystem } from "./cooldownSystem.js";
import { AbilitySelector } from "./abilitySelector.js";
import PlayerData from "../utils/playerData.js";

/**
 * 능력 시스템 - 청금석 우클릭 감지
 */
export class AbilitySystem {
  static LAPIS_ITEM = "minecraft:lapis_lazuli";
  static registeredJobs = {};

  /**
   * 능력 등록
   */
  static registerAbility(jobName, abilityNumber, handler) {
    if (!this.registeredJobs[jobName]) {
      this.registeredJobs[jobName] = {};
    }
    this.registeredJobs[jobName][abilityNumber] = handler;
  }

  /**
   * 플레이어의 우클릭 감지 및 능력 발���
   */
  static triggerAbility(player) {
    const job = JobSystem.getJob(player);
    
    // 직업 없음
    if (!job) {
      return;
    }

    // 손에 청금석이 없음
    const mainhand = player.getComponent("minecraft:equippable")?.getEquipment("Mainhand");
    if (!mainhand || mainhand.typeId !== this.LAPIS_ITEM) {
      return;
    }

    // 선택된 능력 번호
    const abilityNumber = AbilitySelector.getSelectedAbilityNumber(player, job);

    // 쿨타임 확인
    if (!CooldownSystem.isReady(player, job, abilityNumber)) {
      const remaining = CooldownSystem.getRemainingCooldown(player, job, abilityNumber);
      player.sendMessage(`§c쿨타임: ${CooldownSystem.formatCooldown(remaining)}`);
      return;
    }

    // 등록된 능력 발동
    if (this.registeredJobs[job] && this.registeredJobs[job][abilityNumber]) {
      this.registeredJobs[job][abilityNumber](player);
    } else {
      player.sendMessage("§c이 능력은 아직 구현되지 않았습니다.");
    }
  }

  /**
   * 능력 쿨타임 설정
   */
  static setAbilityCooldown(player, jobName, abilityNumber, seconds) {
    CooldownSystem.setCooldown(player, jobName, abilityNumber, seconds);
  }
}

export default AbilitySystem;