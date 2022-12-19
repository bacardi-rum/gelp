// 10 10+20 30+30 以10为单位
// 10 30 60 100 150
export const getLevel = (score: number): [number, number] => {
  let i = 1, initialScore = 0
  while (score >= 0) {
    console.log(i, score, initialScore)
    score -= initialScore + i * 10
    initialScore += i * 10
    
    if (score >= 0) { i++ }
  }
  return [i, -score]
}

export const getScoreByLevel = (level: number) => {
  let sum = 0
  for (let i = 1; i <= level; i++) {
    sum += i * 10
  }
  return sum
}