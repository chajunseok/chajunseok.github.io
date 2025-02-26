module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/beevarium/'  // 레포지토리 이름
    : '/',
  outputDir: 'dist'
} 