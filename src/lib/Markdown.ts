export const addGift = (replyText: React.RefObject<HTMLTextAreaElement>) => {
  const textarea = replyText.current!;
  const gift = "![Parce que c'est notre projet !](./projet.gif)";
  textarea.value = `${textarea.value.slice(
    0,
    textarea.selectionStart
  )}${gift}${textarea.value.slice(textarea.selectionEnd)}`;
  textarea.focus();
  textarea.selectionEnd = textarea.selectionEnd + gift.length;
};

export const addVideo = (replyText: React.RefObject<HTMLTextAreaElement>) => {
  const textarea = replyText.current!;
  const video = "Ψ(id_youtube)Ψ";
  textarea.value = `${textarea.value.slice(
    0,
    textarea.selectionStart
  )}${video}${textarea.value.slice(textarea.selectionEnd)}`;
  textarea.focus();
  textarea.selectionStart = textarea.selectionEnd - "id_youtube)Ψ".length;
  textarea.selectionEnd = textarea.selectionEnd - ")Ψ".length;
};

export const addHighlight = (
  replyText: React.RefObject<HTMLTextAreaElement>
) => {
  const textarea = replyText.current!;
  const hightlight = "ω(info)ω";
  textarea.value = `${textarea.value.slice(
    0,
    textarea.selectionStart
  )}${hightlight}${textarea.value.slice(textarea.selectionEnd)}`;
  textarea.focus();
  textarea.selectionStart = textarea.selectionEnd - "info)ω".length;
  textarea.selectionEnd = textarea.selectionEnd - ")ω".length;
};

export function parseCustomElement(text: string) {
  const htmlText = text
    .replace(
      /Ψ\((.*?)\)Ψ/gim,
      `<div>
            <div>
                <iframe title="titre de l’iframe" src="https://www.youtube.com/embed/$1" width="100%" height="100%" allow="fullscreen; picture-in-picture"></iframe>
            </div>
        </div>`
    )
    .replace(/ω\((.*?)\)ω/gim, "<div class='fr-highlight fr-m-0'>$1</div>");
  return htmlText.trim();
}
