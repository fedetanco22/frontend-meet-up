import Link from 'next/link';

const Logo = ({ color, width, height }) => {
    const logoColor = color ? '#5578FF' : 'white';

    return (
        <Link href='/'>
            <a>
                <svg
                    width='100'
                    height='50'
                    viewBox='0 0 171 61'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                >
                    <path
                        d='M0 41.8644H6.5742L7.39598 30.206C7.39598 26.2315 7.6699 21.7272 7.6699 17.4877H7.94383C8.7656 21.4622 9.8613 25.7016 10.6831 29.4111L14.2441 41.3345H19.9965L23.8315 29.4111C24.9272 25.7016 26.2968 21.1972 27.3925 17.4877C27.3925 21.9921 27.6664 26.2315 27.9404 30.206L28.2143 41.8644H35.3363L33.6928 10.8636H24.1054L20.8183 21.1972C19.7226 24.6418 18.6269 28.8812 17.8051 32.5907H17.5312C16.7094 28.8812 15.8877 24.9067 14.792 21.1972L11.7788 10.8636H1.91748L0 41.8644ZM39.4452 31.0009C39.4452 38.1549 44.1019 42.3943 52.0458 42.3943C55.0589 42.3943 58.0721 41.8644 60.2635 41.0695L59.4418 36.3002C57.5243 36.8301 55.3329 37.36 52.8675 37.36C49.5804 37.36 46.5673 35.7702 46.2933 32.8556H61.3592C61.3592 32.3257 61.6332 31.5308 61.6332 30.206C61.6332 24.6418 58.8939 19.0775 51.224 19.0775C43.2802 19.0775 39.4452 25.1717 39.4452 31.0009ZM46.2933 28.0863C46.5673 26.2315 47.663 23.5819 50.9501 23.5819C54.2372 23.5819 55.0589 26.4965 55.0589 28.0863H46.2933ZM64.6463 31.0009C64.6463 38.1549 69.0291 42.3943 76.973 42.3943C80.2601 42.3943 82.9993 41.8644 85.4646 41.0695L84.3689 36.3002C82.4515 36.8301 80.534 37.36 78.0687 37.36C74.7816 37.36 71.7684 35.7702 71.4945 32.8556H86.5603C86.5603 32.3257 86.8343 31.5308 86.8343 30.206C86.8343 24.6418 83.8211 19.0775 76.4251 19.0775C68.2074 19.0775 64.6463 25.1717 64.6463 31.0009ZM71.4945 28.0863C71.7684 26.2315 72.8641 23.5819 75.8773 23.5819C79.1644 23.5819 79.9861 26.4965 79.9861 28.0863H71.4945ZM93.9563 40.5396C95.3259 41.5994 97.2434 42.3943 99.4348 42.3943C101.626 42.3943 103.27 42.1294 104.092 41.8644V36.5651C103.544 36.5651 102.996 36.8301 101.9 36.8301C99.7087 36.8301 99.1609 35.5053 99.1609 32.8556V24.6418H104.365V19.6075H99.1609V12.9834L92.0388 14.5731V19.6075H89.0257V24.6418H92.0388V33.9155C92.0388 37.0951 92.8606 39.2148 93.9563 40.5396Z'
                        fill='white'
                    />
                    <path
                        d='M114.775 28.3512C114.775 38.1549 119.431 42.3943 127.375 42.3943C135.867 42.3943 140.798 38.1549 140.798 28.6162V10.8636H133.676V28.8812C133.676 34.4454 131.484 36.8301 127.649 36.8301C124.088 36.8301 121.897 34.1804 121.897 28.8812V10.8636H114.775V28.3512ZM154.22 40.0096C155.316 41.3345 157.507 42.3943 160.246 42.3943C165.451 42.3943 170.929 38.6848 170.929 30.471C170.929 23.3169 166.273 19.0775 161.068 19.0775C157.781 19.0775 155.042 20.1374 153.398 22.522L152.85 19.6074H146.55C146.824 21.7272 146.824 24.1118 146.824 27.0264V51.1381H154.22V40.0096ZM154.22 33.9155C154.22 33.3856 154.22 32.8556 154.22 32.3257V29.1461C154.22 28.8812 154.22 28.3512 154.22 28.0863C154.768 25.9666 156.685 24.3768 158.603 24.3768C161.89 24.3768 163.533 27.0264 163.533 30.7359C163.533 34.4454 161.616 37.095 158.603 37.095C156.411 37.095 154.768 35.7702 154.22 33.9155Z'
                        fill='#FF64C8'
                    />
                    <path
                        d='M35.8844 58.8219H39.9933V60.4117H33.9669V52.1978H39.7194V53.7876H35.8844V55.6424H39.1715V56.9672H35.8844V58.8219ZM46.5675 52.1978H48.2111V60.4117H46.2936L42.7326 54.8475V60.4117H41.089V52.1978H42.7326L46.5675 57.7621V52.1978ZM56.1549 56.4372V60.1467C55.3331 60.4117 54.7853 60.4117 53.9635 60.4117C52.5939 60.4117 51.2242 60.1467 50.4025 59.3519C49.8546 58.8219 49.3068 57.7621 49.3068 56.4372C49.3068 54.8475 49.8546 54.0526 50.4025 53.2577C51.2242 52.4628 52.5939 52.1978 53.9635 52.1978C54.7853 52.1978 55.3331 52.1978 55.881 52.4628V53.7876C55.3331 53.7876 54.7853 53.7876 54.2374 53.7876C53.4156 53.7876 52.8678 53.7876 52.5939 54.0526C52.046 54.0526 51.7721 54.3175 51.4982 54.8475C51.2242 55.1124 51.2242 55.6424 51.2242 56.4372C51.2242 57.2321 51.4982 58.027 51.7721 58.292C52.3199 58.8219 53.1417 58.8219 53.9635 58.8219C53.9635 58.8219 54.2374 58.8219 54.5113 58.8219V56.4372H56.1549ZM57.5245 60.4117V52.1978H59.442V58.8219H63.2769V60.4117H57.5245ZM63.8248 60.4117V52.1978H65.7423V60.4117H63.8248ZM69.3033 60.4117C69.0294 60.4117 68.4815 60.4117 68.2076 60.4117C67.6597 60.1467 67.3858 60.1467 67.1119 60.1467V58.557C67.3858 58.8219 67.6597 58.8219 68.2076 58.8219C68.4815 59.0869 69.0294 59.0869 69.3033 59.0869C69.8511 59.0869 70.1251 58.8219 70.399 58.8219C70.6729 58.557 70.9468 58.292 70.9468 58.027C70.9468 57.7621 70.6729 57.7621 70.6729 57.7621C70.6729 57.4971 70.399 57.4971 70.399 57.2321C70.1251 57.2321 69.8511 57.2321 69.5772 56.9672H69.0294C68.2076 56.7022 67.6597 56.4372 67.3858 56.1723C67.1119 55.6424 66.838 55.3774 66.838 54.5825C66.838 53.7876 67.1119 53.2577 67.6597 52.7277C68.2076 52.4628 69.0294 52.1978 70.1251 52.1978C70.6729 52.1978 70.9468 52.1978 71.2208 52.1978C71.4947 52.1978 72.0425 52.4628 72.3165 52.4628V53.7876C72.0425 53.7876 71.7686 53.7876 71.2208 53.7876C70.9468 53.7876 70.6729 53.5226 70.399 53.5226C69.8511 53.5226 69.3033 53.7876 69.0294 53.7876C68.7554 54.0526 68.7554 54.3175 68.7554 54.5825C68.7554 54.8475 68.7554 54.8475 68.7554 54.8475C68.7554 55.1124 68.7554 55.1124 69.0294 55.1124C69.3033 55.3774 69.3033 55.3774 69.5772 55.3774L70.399 55.6424C71.2208 55.9073 71.7686 56.1723 72.0425 56.4372C72.3165 56.9672 72.5904 57.2321 72.5904 58.027C72.5904 58.557 72.5904 58.8219 72.3165 59.3519C72.0425 59.6168 71.4947 59.8818 71.2208 60.1467C70.6729 60.4117 70.1251 60.4117 69.3033 60.4117ZM73.6861 60.4117V52.1978H75.6036V55.3774H78.8907V52.1978H80.8081V60.4117H78.8907V56.9672H75.6036V60.4117H73.6861ZM90.3955 60.4117L89.8477 58.292H86.8345L86.0127 60.4117H84.3692L86.8345 52.1978H89.5737L92.313 60.4117H90.3955ZM87.1084 56.7022H89.2998L88.2041 53.2577L87.1084 56.7022ZM96.9697 60.4117C95.6001 60.4117 94.5044 60.1467 93.6826 59.3519C92.8609 58.8219 92.5869 57.7621 92.5869 56.4372C92.5869 54.8475 93.1348 54.0526 93.6826 53.2577C94.5044 52.4628 95.6001 52.1978 96.9697 52.1978C97.7915 52.1978 98.3394 52.1978 98.8872 52.4628V53.7876C98.3394 53.7876 97.7915 53.7876 97.2437 53.7876C96.6958 53.7876 96.148 53.7876 95.6001 54.0526C95.3262 54.0526 95.0523 54.3175 94.7783 54.8475C94.5044 55.1124 94.5044 55.6424 94.5044 56.4372C94.5044 56.9672 94.5044 57.4971 94.7783 57.7621C95.0523 58.292 95.3262 58.557 95.6001 58.557C96.148 58.8219 96.4219 58.8219 96.9697 58.8219C97.5176 58.8219 98.0654 58.8219 98.8872 58.8219V60.1467C98.6133 60.1467 98.3394 60.4117 97.7915 60.4117C97.5176 60.4117 97.2437 60.4117 96.9697 60.4117ZM105.187 60.4117L104.64 58.292H101.626L100.805 60.4117H99.1611L101.9 52.1978H104.366L107.105 60.4117H105.187ZM101.9 56.7022H104.092L102.996 53.2577L101.9 56.7022ZM110.118 60.4117C109.296 60.4117 108.749 60.4117 107.927 60.1467V52.4628C108.201 52.4628 108.749 52.4628 109.296 52.1978C109.57 52.1978 110.118 52.1978 110.666 52.1978C112.036 52.1978 113.131 52.4628 113.953 53.2577C114.775 53.7876 115.049 54.8475 115.049 56.4372C115.049 57.2321 114.775 58.027 114.501 58.557C114.227 59.3519 113.679 59.6168 112.857 59.8818C112.31 60.1467 111.214 60.4117 110.118 60.4117ZM110.666 58.8219C111.214 58.8219 111.762 58.8219 112.036 58.557C112.583 58.557 112.857 58.292 112.857 57.7621C113.131 57.4971 113.131 56.9672 113.131 56.4372C113.131 55.6424 113.131 55.1124 112.857 54.8475C112.857 54.3175 112.583 54.0526 112.036 54.0526C111.762 53.7876 111.214 53.7876 110.666 53.7876C110.392 53.7876 110.118 53.7876 109.844 53.7876V58.8219C109.844 58.8219 110.392 58.8219 110.666 58.8219ZM118.062 58.8219H122.171V60.4117H116.144V52.1978H122.171V53.7876H118.062V55.6424H121.623V56.9672H118.062V58.8219ZM130.115 52.1978H132.306V60.4117H130.389V54.5825L128.471 59.0869H127.101L124.91 54.8475V60.4117H123.267V52.1978H125.458L127.649 57.2321L130.115 52.1978ZM140.25 52.1978L137.511 56.9672V60.4117H135.593V56.9672L132.58 52.1978H134.497L136.689 55.3774L138.606 52.1978H140.25Z'
                        fill='#5578FF'
                    />
                    <path
                        fillRule='evenodd'
                        clipRule='evenodd'
                        d='M35.0622 0H106.831V7.94891H35.0622V0Z'
                        fill='#5578FF'
                    />
                    <path
                        fillRule='evenodd'
                        clipRule='evenodd'
                        d='M141.072 0H123.54V7.94891H141.072V0Z'
                        fill='#5578FF'
                    />
                </svg>
            </a>
        </Link>
    );
};

export default Logo;
