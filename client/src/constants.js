const env = process.env.NODE_ENV || 'development';
const serverIP = 'localhost';
const serverPort = 3000;
export default {
  CUSTOMER: 'customer',
  CREATOR: 'creator',
  MODERATOR: 'moderator',
  CONTEST_STATUS_ACTIVE: 'active',
  CONTEST_STATUS_FINISHED: 'finished',
  CONTEST_STATUS_PENDING: 'pending',
  NAME_CONTEST: 'name',
  LOGO_CONTEST: 'logo',
  TAGLINE_CONTEST: 'tagline',
  OFFER_STATUS_REJECTED: 'rejected',
  OFFER_STATUS_WON: 'won',
  OFFER_STATUS_PENDING: 'pending',
  STATIC_IMAGES_PATH: '/staticImages/',
  ANONYM_IMAGE_PATH: '/staticImages/anonym.png',
  BASE_URL: `http://${serverIP}:${serverPort}/`,
  ACCESS_TOKEN: 'accessToken',
  REFRESH_TOKEN: 'refreshToken',
  publicURL:
    env === 'production'
      ? `http://${serverIP}:80/images/`
      : `http://${serverIP}:${serverPort}/public/images/`,
  NORMAL_PREVIEW_CHAT_MODE: 'NORMAL_PREVIEW_CHAT_MODE',
  FAVORITE_PREVIEW_CHAT_MODE: 'FAVORITE_PREVIEW_CHAT_MODE',
  BLOCKED_PREVIEW_CHAT_MODE: 'BLOCKED_PREVIEW_CHAT_MODE',
  CATALOG_PREVIEW_CHAT_MODE: 'CATALOG_PREVIEW_CHAT_MODE',
  CHANGE_BLOCK_STATUS: 'CHANGE_BLOCK_STATUS',
  ADD_CHAT_TO_OLD_CATALOG: 'ADD_CHAT_TO_OLD_CATALOG',
  CREATE_NEW_CATALOG_AND_ADD_CHAT: 'CREATE_NEW_CATALOG_AND_ADD_CHAT',
  USER_INFO_MODE: 'USER_INFO_MODE',
  CASHOUT_MODE: 'CASHOUT_MODE',
  AUTH_MODE: {
    REGISTER: 'REGISTER',
    LOGIN: 'LOGIN',
  },
  HEADER_ANIMATION_TEXT: [
    'a Company',
    'a Brand',
    'a Website',
    'a Service',
    'a Book',
    'a Business',
    'an App',
    'a Product',
    'a Startup',
  ],
  BUTTON_GROUP: [
    {
      title: 'Yes',
      text: 'But minor variations are allowed',
      value: 'yes',
    },
    {
      title: 'Yes',
      text: 'The Domain should exactly match the name',
      value: 'asname',
    },
    {
      title: 'No',
      text: 'I am only looking for a name, not a Domain',
      value: 'no',
    },
  ],
  FOOTER_ITEMS: [
    {
      title: 'SQUADHELP',
      items: [
        { href: `#`, text: 'About' },
        { href: `#`, text: 'Contact' },
        { href: `/how-it-works`, text: 'How It Works?' },
        { href: `#`, text: 'Testimonials' },
        { href: `#`, text: 'Our Work' },
      ],
    },
    {
      title: 'RESOURCES',
      items: [
        { href: `/how-it-works`, text: 'How It Works' },
        { href: `#`, text: 'Become a Creative' },
        { href: `#`, text: 'Business Name Generator' },
        { href: `#`, text: 'Discussion Forum' },
        { href: `#`, text: 'Blog' },
        { href: `#`, text: 'Download eBook' },
        { href: `#`, text: 'Pricing' },
        { href: `#`, text: 'Help & FAQs' },
      ],
    },
    {
      title: 'OUR SERVICES',
      items: [
        { href: `#`, text: 'Naming' },
        { href: `#`, text: 'Logo Design' },
        { href: `#`, text: 'Taglines' },
        { href: `#`, text: 'Premium Names For Sale' },
        { href: `#`, text: 'Creative Owned Names For Sale' },
        { href: `#`, text: 'Audience Testing' },
        { href: `#`, text: 'Trademark Research & Filling' },
        { href: `#`, text: 'Managed Agency Service' },
      ],
    },
    {
      title: 'LEGAL',
      items: [
        { href: `#`, text: 'Terms of Service' },
        { href: `#`, text: 'Privacy Policy' },
        { href: `#`, text: 'Cookie Policy' },
      ],
    },
  ],
  HOW_SERVICE_ITEM: [
    {
      title: 'Launch a Contest',
      text: 'Work with hundreds of creative experts to get custom name suggestions for your business or brand. All names are auto-checked for URL availability.',
      image: 'service-image1.svg',
      btnText: 'Launch a Contest',
    },
    {
      title: 'Explore Names For Sale',
      text: 'Our branding team has curated thousands of pre-made names that you can purchase instantly. All names include a matching URL and a complimentary Logo Design',
      image: 'service-image2.svg',
      btnText: 'Explore Names For Sale',
    },
    {
      title: 'Agency-level Managed Contests',
      text: 'Our Managed contests combine the power of crowdsourcing with the rich experience of our branding consultants. Get a complete agency-level experience at a fraction of Agency costs',
      image: 'service-image3.svg',
      btnText: 'Learn More',
    },
  ],
  HOW_FAQ_ITEMS: [
    {
      anchor: 'contests',
      title: 'Launching A Contest',
      list: [
        {
          btnText: 'How long does it take to start receiving submissions?',
          text: 'For Naming contests, you will start receiving your submissions within few minutes of launching your contest. Since our creatives are located across the globe, you can expect to receive submissions 24 X 7 throughout the duration of the brainstorming phase.',
        },
        {
          btnText: 'How long do Naming Contests last?',
          text: 'You can choose a duration from 1 day to 7 days. We recommend a duration of 3 Days or 5 Days. This allows for sufficient time for entry submission as well as brainstorming with creatives. If you take advantage of our validation services such as Audience Testing and Trademark Research, both will be an additional 4-7 days (3-5 business days for Audience Testing and 1-2 business days for Trademark Research).',
        },
        {
          btnText: 'Where are the creatives located?',
          text: 'About 70% of our Creatives are located in the United States and other English speaking countries (i.e. United Kingdom, Canada, and Australia.). We utilize an advanced rating score algorithm to ensure that high quality creatives receive more opportunities to participate in our contests.',
        },
        {
          btnText: 'What if I do not like any submissions?',
          text: 'While it is unusually rare that you will not like any names provided, we have a few options in case this problem occurs:',
          subList: [
            {
              subText:
                'If the contest ends and you have not yet found a name that you’d like to move forward with, we can provide complimentary extension of your contest as well as a complimentary consultation with one of our branding consultants (a $99 value).',
            },
            {
              subText:
                'By exploring our premium domain marketplace you can apply the contest award towards the purchase of any name listed for sale.',
            },
            {
              subText:
                "If you choose the Gold package or Platinum package and keep the contest as 'Not Guaranteed', you can request a partial refund if you choose not to move forward with any name from you project. (Please note that the refund is for the contest award). Here is a link to our <a href='/login'>Refund Policy</a>",
            },
          ],
        },
        {
          btnText: 'How much does it cost?',
          text: "Our naming competitions start at $299, and our logo design competitions start at $299. Also, there are three additional contest level that each offer more features and benefits. See our <a href='/login'>Pricing Page</a> for details",
        },
        {
          btnText:
            'I need both a Name and a Logo. Do you offer any discount for multiple contests?',
          text: "Yes! We have many contest bundles - our most popular being our Name, Tagline, and Logo bundle. Bundles allow you to purchase multiple contests at one time and save as much as from $75 - $400. You can learn more about our bundle options on our <a href='/login'>Pricing Page</a>.",
        },
        {
          btnText: 'What if I want to keep my business idea private?',
          text: 'You can select a Non Disclosure Agreement (NDA) option at the time of launching your competition. This will ensure that only those contestants who agree to the NDA will be able to read your project brief and participate in the contest. The contest details will be kept private from other users, as well as search engines.',
        },
        {
          btnText: 'Can you serve customers outside the US?',
          text: 'Absolutely. Squadhelp services organizations across the globe. Our customer come from many countries, such as the United States, Australia, Canada, Europe, India, and MENA. We’ve helped more than 25,000 customer around the world.',
        },
        {
          btnText: 'Can I see any examples?',
          text: 'Our creatives have submitted more than 6 Million names and thousands of logos on our platform. Here are some examples of Names, Taglines, and Logos that were submitted in recent contests.',
          subList: [
            {
              subText: "<a href='/login'>Name Examples</a>",
            },
            {
              subText: "<a href='/login'>Tagline Examples</a>",
            },
            {
              subText: "<a href='/login'>Logo Examples</a>",
            },
          ],
        },
      ],
    },
    {
      anchor: 'marketplace',
      title: 'Buying From Marketplace',
      list: [
        {
          btnText: "What's included with a Domain Purchase?",
          text: 'When you purchase a domain from our premium domain marketplace, you will receive the exact match .com URL, a complimentary logo design (along with all source files), as well as a complimentary Trademark report and Audience Testing if you’re interested in validating your name.',
        },
        {
          btnText: 'How does the Domain transfer process work?',
          text: 'Once you purchase a Domain, our transfer specialists will reach out to you (typically on the same business day). In most cases we can transfer the domain to your preferred registrar (such as GoDaddy). Once we confirm the transfer details with you, the transfers are typically initiated to your account within 1 business day.',
        },
        {
          btnText:
            'If I purchase a Domain on installments, can I start using it to setup my website?',
          text: 'We offer payment plans for many domains in our Marketplace. If you purchase a domain on a payment plan, we hold the domain in an Escrow account until it is fully paid off. However our team can assist you with making any changes to the domains (such as Nameserver changes), so that you can start using the domain right away after making your first installment payment.',
        },
      ],
    },
    {
      anchor: 'managed',
      title: 'Managed Contests',
      list: [
        {
          btnText: 'What are Managed Contests?',
          text: "The 'Managed' option is a fully managed service by Squadhelp Branding experts. It includes a formal brief preparation by Squadhelp team and management of your contest. Managed Contests are a great fit for companies that are looking for an 'Agency' like experience and they do not want to manage the contest directly. Our branding team has directly managed hundreds of branding projects and has learned several best practices that lead to successful project outcomes. Our team will apply all best practices towards the management of your branding project. Learn more about our <a href='/login'>Managed Contest Service</a>",
        },
        {
          btnText: "What's a typical timeline for a Managed Contest?",
          text: 'The overall process takes 12-13 days.',
          subList: [
            {
              subText:
                'The Managed projects start with a project kick-off call with your Branding Consultant. You can schedule this call online immediately after making your payment.',
            },
            {
              subText:
                'After your kick-off call, the Branding consultant will write your project brief and send for your approval within 1 business day.',
            },
            {
              subText:
                'Upon your approval, the contest will go live. The branding consultant will help manage your project throughout the brainstorming phase (typically 5 days).',
            },
            {
              subText:
                'Upon the completion of brainstorming phase, the branding consultant will work with you to test the top 6 names from your Shortlist (3-5 Days). In addition, the branding consultant will coordinate the detailed Trademark screening (1-3 days)',
            },
          ],
        },
        {
          btnText: 'How much do Managed Contests cost?',
          text: 'We offer two levels of Managed Contests. Standard ($1499) and Enterprise ($2999). The Enterprise managed contest includes:',
          subList: [
            {
              subText:
                '(1) a $500 award amount (instead of $300), which will attract our top Creatives and provide more options to choose from;',
            },
            {
              subText:
                '(2) we will ensure a senior member of our branding team is assigned to your project and the branding team will invest about 3X more time in the day-to-day management of your project;',
            },
            {
              subText:
                '(3) you will receive more high-end trademark report and 5X more responses for your audience test.',
            },
            {
              subText:
                "Here is a link to our <a href='www.google.com'>Pricing page</a> with a detailed comparison of the two packages.",
            },
          ],
        },
        {
          btnText: 'Where are the Branding Consultants located?',
          text: 'All our branding consultants are based in in our Headquarters (Hoffman Estates, IL). Our branding consultants have many years of experience in managing hundreds of branding projects for companies ranging from early stage startups to Fortune 500 corporations.',
        },
      ],
    },
    {
      anchor: 'creatives',
      title: 'For Creatives',
      list: [
        {
          btnText: 'Can anyone join your platform?',
          text: 'We are open to anyone to signup. However, we have an extensive <a href=\'/login\'>"Quality Scoring"</a> process which ensures that high quality creatives have the ability to continue to participate in the platform. On the other hand, we limit the participation from those creatives who do not consistently receive high ratings.',
        },
        {
          btnText: 'Can I start participating immediately upon signing up?',
          text: "When you initially signup, you are assigned few contests to assess your overall quality of submissions. Based upon the quality of your submissions, you will continue to be assigned additional contests. Once you have received enough high ratings on your submissions, your account will be upgraded to 'Full Access', so that you can begin participating in all open contests.",
        },
        {
          btnText: 'How Do I Get Paid?',
          text: 'We handle creative payouts via Paypal or Payoneer. Depending upon your country of residence, we may require additional documentation to verify your identity as well as your Tax status.',
        },
      ],
    },
  ],
  HOW_STATS_ITEM: [
    {
      image: 'stats-image1.svg',
      text: '<span>4.9 out of 5 stars</span> from 25,000+ customers.',
    },
    {
      image: 'stats-image2.png',
      text: 'Our branding community stands <span>200,000+</span> strong.',
    },
    {
      image: 'stats-image3.svg',
      text: '<span>140+ Industries</span> supported across more than <span>85 countries</span> – and counting.',
    },
  ],
};
