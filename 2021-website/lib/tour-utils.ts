import ITourUrls from '../interfaces/ITourUrls';

const AWS_PREFIX='https://thevecentre.s3.eu-west-2.amazonaws.com';

export function getTourURLs(mediaIndex?: number): ITourUrls {
    const urlPrefix = `${AWS_PREFIX}/SalsaMish`

    const indexHtml: string = mediaIndex && mediaIndex > 0 ? `${urlPrefix}/index.htm?media-index=${mediaIndex}` : `${urlPrefix}/index.htm`;
    const socialThumbnail: string = `${urlPrefix}/socialThumbnail.jpg`;
    const favicon: string = `${urlPrefix}/favicon.ico`;
    const manifest: string = `${urlPrefix}/manifest.json`;
    const browserConfig: string = `${urlPrefix}/browserconfig.xml`;
    const miscDir: string = `${urlPrefix}/misc`;
    return {
        baseUrl: urlPrefix,
        indexHtml,
        socialThumbnail,
        favicon,
        manifest,
        browserConfig,
        miscDir,
    };
}