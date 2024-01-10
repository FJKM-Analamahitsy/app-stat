export interface MemberShema {
  name: string;
  forname?: string;
  birthday?: Date;
  birthplace?: string;
  gender?: string;
  adress?: string;
  city?: string;
  place?: string;
  job?: string;
  talent?: string;
  phone?: string;
  mail?: string;
  fb?: string;
  hobby?: string;
  batisa?: {
    status: boolean;
    year: number;
  };
  mpandray?: {
    status: boolean;
    andiany: string;
    karatra: number;
  };
  family?: {
    id: string;
    place: string;
    rank: number;
  };
}
