const extractVerificationLink = (htmlString: string): string | null => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, "text/html");
    const linkElement = doc.querySelector("a");
    if (linkElement) {
      return linkElement.getAttribute("href");
    }
    return null;
  };