import { IPerformer } from './performer';

export interface IVideo {
  _id: string;
  title: string;
  slug: string;
  performerId: string;
  isSaleVideo: boolean;
  price: number;
  status: string;
  description: string;
  thumbnail: {
    url: string;
    thumbnails: any[]
  };
  teaserId: string;
  teaser: {
    url: string;
    thumbnails: any[],
    duration: number;
  };
  processing: boolean;
  teaserProcessing: boolean;
  tags: string[];
  participantIds: string[];
  participants: any[];
  fileId: string;
  video: {
    url: string;
    thumbnails: string[];
    duration: number | string;
    width: number;
    height: number;
  };
  stats: {
    views: number;
    likes: number;
    comments: number;
    favourites: number;
    wishlists: number;
  };
  performer: IPerformer;
  isSubscribed: boolean;
  isBought: boolean;
  isLiked: boolean;
  isFavourited: boolean;
  isWishlist: boolean;
  isSchedule: boolean;
  scheduledAt: Date;
  updatedAt: Date;
  createdAt: Date;
}

const initialPerformer: IPerformer = {
  _id: 'id',
  name: 'string',
  firstName: 'string',
  lastName: 'string',
  username: 'string',
  email: 'string',
  phone: 'string',
  phoneCode: 'string',
  avatarPath: 'string',
  avatar: 'any',
  coverPath: 'string',
  cover: 'any',
  gender: 'string',
  country: 'string',
  city: 'string',
  state: 'string',
  zipcode: 'string',
  address: 'string',
  languages: [''],
  categoryIds: [''],
  dateOfBirth: new Date(),
  butt: 'string',
  hair: 'string',
  pubicHair: 'string',
  bodyType: 'string',
  ethnicity: 'string',
  height: 'string',
  weight: 'string',
  bio: 'string',
  eyes: 'string',
  sexualPreference: 'string',
  monthlyPrice: 1,
  yearlyPrice: 1,
  stats: {
    likes: 1,
    subscribers: 1,
    views: 1,
    totalVideos: 1,
    totalPhotos: 1,
    totalGalleries: 1,
    totalProducts: 1,
    totalStories: 1
  },
  score: 1,
  isPerformer: false,
  bankingInformation: {
    firstName: 'string',
    lastName: 'string',
    SSN: 'string',
    bankName: 'string',
    bankAccount: 'string',
    bankRouting: 'string',
    bankSwiftCode: 'string',
    address: 'string',
    city: 'string',
    state: 'string',
    country: 'string',
    performerId: 'string'
  },
  paypalSetting: 'any',
  blockCountries: 'any',
  createdBy: 'string',
  createdAt: new Date(),
  updatedAt: new Date(),
  isOnline: 1,
  welcomeVideoId: 'string',
  welcomeVideoPath: 'string',
  live: false,
  streamingStatus: 'string',
  activateWelcomeVideo: false,
  isSubscribed: false,
  verifiedAccount: false,
  verifiedDocument: false,
  privateChatPrice: 1,
  groupChatPrice: 1,
  documentVerification: 'any',
  idVerification: 'any'
};

export const initialVideoData: IVideo = {
  _id: 'string',
  title: 'string',
  slug: 'string',
  performerId: 'string',
  isSaleVideo: false,
  price: 0,
  status: 'string',
  description: 'string',
  thumbnail: {
    url: 'string',
    thumbnails: []
  },
  teaserId: 'string',
  teaser: {
    url: 'string',
    thumbnails: [],
    duration: 5
  },
  processing: false,
  teaserProcessing: false,
  tags: [],
  participantIds: [''],
  participants: [],
  fileId: 'string',
  video: {
    url: 'string',
    thumbnails: [],
    duration: '00:00',
    width: 40,
    height: 40
  },
  stats: {
    views: 0,
    likes: 0,
    comments: 0,
    favourites: 0,
    wishlists: 0
  },
  performer: initialPerformer,
  isSubscribed: false,
  isBought: false,
  isLiked: false,
  isFavourited: false,
  isWishlist: false,
  isSchedule: false,
  scheduledAt: new Date(),
  updatedAt: new Date(),
  createdAt: new Date()
};
