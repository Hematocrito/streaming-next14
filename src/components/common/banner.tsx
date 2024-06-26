/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable react/require-default-props */
import { PureComponent } from 'react';
import { Carousel, Image } from 'antd';
import { IBanner } from '@interfaces/banner';

interface IProps {
  banners: IBanner[];
  arrows?: boolean;
  dots?: boolean;
  autoplay?: boolean;
  effect?: any;
  className?: string;
}

export class Banner extends PureComponent<IProps> {
  render() {
    const {
      banners, arrows = true, dots = false, autoplay = true, effect = 'scrollx', className
    } = this.props;
    return (
      <>
        {banners && banners.length > 0
        && (
        <Carousel
          className={className}
          effect={effect}
          adaptiveHeight
          autoplay={autoplay}
          swipeToSlide
          arrows={arrows}
          dots={dots}
        >
          {banners.map((item) => (
            //  eslint-disable-next-line jsx-a11y/control-has-associated-label
            <a key={item?._id} href={item?.link} target="_.blank"><Image preview={false} src="/img/banner.jpg" alt="" key={item._id} /></a>
          ))}
        </Carousel>
        )}
      </>
    );
  }
}
