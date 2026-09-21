/** 클립보드에 복사한다. 권한 거부·미지원 환경이면 false. */
export async function copyText(text: string) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}
