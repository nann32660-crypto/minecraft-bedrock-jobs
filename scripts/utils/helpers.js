import { world, system } from "@minecraft/server";

/**
 * 플레이어 찾기 (이름으로)
 */
export function findPlayer(name) {
  for (const player of world.getAllPlayers()) {
    if (player.name === name) return player;
  }
  return null;
}

/**
 * 모든 플레이어 가져오기
 */
export function getAllPlayers() {
  return [...world.getAllPlayers()];
}

/**
 * 플레이어가 특정 직업을 가지고 있는지 확인
 */
export function hasJob(player, jobName) {
  return player.hasTag(jobName);
}

/**
 * 플레이어에게 직업 태그 추가
 */
export function setJob(player, jobName) {
  const jobs = ["swordsman", "archer", "rogue", "robot", "darkDestroyer", "ninja", "tanker", "warlock", "angel", "mercenary", "dragonWarrior"];
  
  // 기존 직업 태그 제거
  jobs.forEach(job => {
    if (player.hasTag(job)) player.removeTag(job);
  });
  
  // 새 직업 태그 추가
  player.addTag(jobName);
}

/**
 * 플레이어의 현재 직업 가져오기
 */
export function getPlayerJob(player) {
  const jobs = ["swordsman", "archer", "rogue", "robot", "darkDestroyer", "ninja", "tanker", "warlock", "angel", "mercenary", "dragonWarrior"];
  
  for (const job of jobs) {
    if (player.hasTag(job)) return job;
  }
  return null;
}

/**
 * 방향 벡터 계산 (플레이어가 바라보는 방향)
 */
export function getDirectionVector(player) {
  const rotation = player.getRotation();
  const yaw = (rotation.x * Math.PI) / 180;
  const pitch = (rotation.y * Math.PI) / 180;
  
  return {
    x: -Math.sin(yaw) * Math.cos(pitch),
    y: -Math.sin(pitch),
    z: Math.cos(yaw) * Math.cos(pitch)
  };
}

/**
 * 거리 계산
 */
export function distance(pos1, pos2) {
  const dx = pos1.x - pos2.x;
  const dy = pos1.y - pos2.y;
  const dz = pos1.z - pos2.z;
  return Math.sqrt(dx * dx + dy * dy + dz * dz);
}

/**
 * 벡터 정규화
 */
export function normalizeVector(vec) {
  const length = Math.sqrt(vec.x * vec.x + vec.y * vec.y + vec.z * vec.z);
  if (length === 0) return { x: 0, y: 0, z: 0 };
  return {
    x: vec.x / length,
    y: vec.y / length,
    z: vec.z / length
  };
}

/**
 * 벡터 스케일
 */
export function scaleVector(vec, scale) {
  return {
    x: vec.x * scale,
    y: vec.y * scale,
    z: vec.z * scale
  };
}

/**
 * 플레이어 기준 거리 내의 모든 엔티티 찾기
 */
export function getNearbyEntities(player, radius) {
  const playerPos = player.location;
  const entities = [];
  
  for (const entity of player.dimension.getEntities()) {
    if (entity === player) continue;
    const dist = distance(playerPos, entity.location);
    if (dist <= radius) {
      entities.push(entity);
    }
  }
  
  return entities;
}

/**
 * 플레이어 기준 거리 내의 모든 플레이어 찾기
 */
export function getNearbyPlayers(player, radius) {
  const playerPos = player.location;
  const players = [];
  
  for (const p of world.getAllPlayers()) {
    if (p === player) continue;
    if (p.dimension !== player.dimension) continue;
    const dist = distance(playerPos, p.location);
    if (dist <= radius) {
      players.push(p);
    }
  }
  
  return players;
}

/**
 * 시간을 틱으로 변환 (1초 = 20틱)
 */
export function secondsToTicks(seconds) {
  return Math.round(seconds * 20);
}

/**
 * 틱을 초로 변환
 */
export function ticksToSeconds(ticks) {
  return ticks / 20;
}

/**
 * 타이머 시작 (비동기)
 */
export function setTimer(callback, seconds) {
  system.runTimeout(callback, secondsToTicks(seconds));
}

/**
 * 반복 타이머 (비동기)
 */
export function setInterval(callback, seconds) {
  const interval = secondsToTicks(seconds);
  const handler = () => {
    callback();
    system.runTimeout(handler, interval);
  };
  system.runTimeout(handler, interval);
  return handler;
}
