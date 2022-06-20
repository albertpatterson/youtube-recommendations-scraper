import { downloadJson } from './utils/download';
import { runRandInterval, pauseRand } from './utils/timing';
import { addBanner } from './utils/banner';

(async () => {
  const removeBanner = addBanner();
  let count = 1;
  const maxCount = 5;

  window.scrollTo(0, 0);
  await pauseRand(2e3, 4e3);

  const data = getRecData();
  const urls = new Set(data.map((data) => data.url));
  scrollToLastRec();

  await runRandInterval(
    () => {
      if (count >= maxCount) {
        downloadJson(data, 'youtube-recommendations.json');
        return true;
      }

      const nextData = getRecData();
      for (const datum of nextData) {
        if (!urls.has(datum.url)) {
          urls.add(datum.url);
          data.push(datum);
        }
      }

      count++;
      scrollToLastRec();
      return false;
    },
    2e3,
    4e3
  );

  removeBanner();
})();

function getRecs() {
  return document.getElementsByTagName('ytd-rich-grid-media');
}

function scrollToLastRec() {
  const recEls = document.getElementsByTagName('ytd-rich-grid-media');
  if (recEls.length > 0) {
    recEls[recEls.length - 1].scrollIntoView();
  }
}

function getRecData() {
  const recEls = getRecs();
  const recs = Array.from(recEls);
  const data = recs.map(getVideoData);
  return data;
}

function getVideoData(container: HTMLElement) {
  const url = getUrl(container);
  const title = getTitle(container);
  const creatorName = getCreatorName(container);
  const creatorUrl = getCreatorUrl(container);
  const verified = getVerified(container);
  const views = getViews(container);
  const time = getTime(container);

  return {
    url,
    title,
    creatorName,
    creatorUrl,
    verified,
    views,
    time,
  };
}

function getLink(container: HTMLElement) {
  const link: HTMLAnchorElement | null = container.querySelector(
    '#details #meta a#video-title-link'
  );

  return link;
}

function getUrl(container: HTMLElement) {
  const link = getLink(container);

  if (!link) {
    return null;
  }

  return link.href;
}

function getTitle(container: HTMLElement) {
  const link = getLink(container);

  if (!link) {
    return null;
  }

  return link.innerText;
}

function getByLine(container: HTMLElement) {
  const byLine: HTMLAnchorElement | null = container.querySelector(
    '#details #metadata #byline-container'
  );

  return byLine;
}

function getCreatorLink(container: HTMLElement) {
  const byLine = getByLine(container);

  if (!byLine) {
    return null;
  }

  const getCreatorLink: HTMLAnchorElement | null = byLine.querySelector(
    '#channel-name #text-container a'
  );

  return getCreatorLink;
}

function getCreatorName(container: HTMLElement) {
  const creatorLink = getCreatorLink(container);
  if (!creatorLink) {
    return null;
  }

  return creatorLink.innerText;
}

function getCreatorUrl(container: HTMLElement) {
  const creatorLink = getCreatorLink(container);
  if (!creatorLink) {
    return null;
  }

  return creatorLink.href;
}

function getVerified(container: HTMLElement) {
  const byLine = getByLine(container);

  if (!byLine) {
    return null;
  }

  const badge = byLine.querySelector('div[aria-label="Verified"]');

  return Boolean(badge);
}

function getMetadataLine(container: HTMLElement) {
  const metadataLine: HTMLAnchorElement | null = container.querySelector(
    '#details #metadata #metadata-line'
  );

  return metadataLine;
}

function getViews(container: HTMLElement) {
  const metadataLine = getMetadataLine(container);
  if (!metadataLine) {
    return null;
  }

  const spans = metadataLine.querySelectorAll('span');
  const viewsSpan = Array.from(spans).find((span) =>
    span.innerText.endsWith('views')
  );

  return viewsSpan ? viewsSpan.innerText : null;
}

function getTime(container: HTMLElement) {
  const metadataLine = getMetadataLine(container);
  if (!metadataLine) {
    return null;
  }

  const spans = metadataLine.querySelectorAll('span');
  const timeSpan = Array.from(spans).find((span) =>
    span.innerText.endsWith('ago')
  );

  return timeSpan ? timeSpan.innerText : null;
}
