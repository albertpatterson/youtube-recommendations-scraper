export async function pause(ms: number) {
  await new Promise((r) => {
    setTimeout(r, ms);
  });
}

function getRand(min: number, max: number) {
  if (max < min) {
    throw new Error('max is less than min');
  }

  return min + Math.random() * (max - min);
}

export async function pauseRand(min: number, max: number) {
  const ms = getRand(min, max);
  await pause(ms);
}

export function setRandTimeout(fcn: () => void, min: number, max: number) {
  const ms = getRand(min, max);
  return window.setTimeout(fcn, ms);
}

export async function runRandInterval(
  fcn: () => boolean,
  min: number,
  max: number
) {
  let quit = fcn();

  while (!quit) {
    await pauseRand(min, max);
    quit = fcn();
  }
}
