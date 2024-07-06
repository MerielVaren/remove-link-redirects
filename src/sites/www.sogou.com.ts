import { IProvider } from "@/provider";
import { removeLinkRedirect, decreaseRedirect, getRedirect, getText, increaseRedirect, queryParser } from "@/utils";

export class SoGouProvider implements IProvider {
  public test = /www\.sogou\.com\/link\?url=/;
  public async resolve(aElement: HTMLAnchorElement) {
    try {
      if (getRedirect(aElement) <= 2 && this.test.test(aElement.href)) {
        increaseRedirect(aElement);
        const res = await GM.xmlHttpRequest({
          method: "GET",
          url: aElement.href,
          anonymous: true,
        });
        decreaseRedirect(aElement);
        const finalUrl = res.finalUrl;
        if (finalUrl && !this.test.test(finalUrl)) {
          removeLinkRedirect(aElement, res.finalUrl);
        } else {
          const matcher = res.responseText.match(/URL=['"]([^'"]+)['"]/);
          if (matcher?.[1]) {
            removeLinkRedirect(aElement, res.finalUrl);
          }
        }
      }
    } catch (err) {
      decreaseRedirect(aElement);
      console.error(err);
    }
  }
  private parsePage(res: { responseText: string }): void {
    const responseText: string = res.responseText.replace(/(src=[^>]*|link=[^>])/g, "");
    const html: HTMLHtmlElement = document.createElement("html");
    html.innerHTML = responseText;

    // let selector = '#main .results div.vrwrap>h3';
    // let selector = '#main .results h3>a';
    const selector = '#main .results a[href*="www.sogou.com/link?url="]';
    const remotes = [].slice.call(html.querySelectorAll("#main .results a[href]"));
    const locals = [].slice.call(document.querySelectorAll(selector));

    for (const localEle of locals) {
      for (const remoteEle of remotes) {
        let localText = getText(localEle);
        let remoteText = getText(remoteEle);

        // 通用按钮，例如【点击下载】
        if (localEle.classList.contains("str-public-btn")) {
          localText = getText(localEle.parentNode);
          remoteText = getText(remoteEle.parentNode);
        } else if (localEle.classList.contains("str_img")) {
          // 图片
          localText = getText(localEle.parentNode.parentNode);
          remoteText = getText(remoteEle.parentNode.parentNode);
        }

        if (!localText || localText !== remoteText) {
          return;
        }
        removeLinkRedirect(localEle, remoteEle.href);
      }
    }
  }
  public async onInit() {
    if (!/www\.sogou\.com\/web/.test(window.top.location.href)) {
      return;
    }
    const query = queryParser(window.top.location.search);

    // 搜索使用http搜索，得到的是直接链接
    const url: string = `${location.protocol.replace(/:$/, "").replace("s", "")}://${
      location.host + location.pathname + query
    }`;

    GM.xmlHttpRequest({
      method: "GET",
      url,
      onload: (res) => {
        this.parsePage(res);
      },
      onerror: (err) => {
        console.error(err);
      },
    });
    
    return this;
  }
}
