import dayjs from 'dayjs';
import AnnouncementBanner, { AnnouncementBannerProps } from './AnnouncementBanner';

export interface TimedAnnouncementBannerProps extends AnnouncementBannerProps {
  timer: {
    start: string
    end: string
  }
}

const TimedAnnouncementBanner = ({ timer, ...props }: TimedAnnouncementBannerProps) => {
  const now = dayjs();
  const isAfterStartDate = now.isAfter(timer.start);
  const isBeforeEndDate = now.isBefore(timer.end);

  return (
    <>
      {isAfterStartDate && isBeforeEndDate &&
        <AnnouncementBanner {...props} />
      }
    </>
  )
}

export default TimedAnnouncementBanner
