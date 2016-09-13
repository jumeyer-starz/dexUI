export interface Redirect {
  _id?: string;
  name: string;
  description: string;
  location: UrlTest;
  owner?: string;
  testEnabled: boolean;
  prodEnabled: boolean;
  invited?: string[];
  urlTests?: urlTest[];
}

interface urlTest {
  userId: string;
  response: string;
}

interface UrlTest {
  name: string;
  lat?: number;
  lng?: number;
}

