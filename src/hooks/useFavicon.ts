import { ref, watch } from "vue";

export function useFavicon() {
  const favicon = ref('');
  const updateIcon = (icon: string):void => {
    const dom = document.head
    .querySelectorAll(`link[rel*='icon']`) as NodeListOf<HTMLAnchorElement>;
    dom.forEach(el => el.href=icon)
  };
  const reset = () => favicon.value = '/vite.svg';

  watch(favicon, (i) => {
    updateIcon(i)
  })
  return { favicon, reset };
}