import {
    EmailShareButton,
    FacebookShareButton,
    TelegramShareButton,
    TwitterShareButton,
    WhatsappShareButton,
    EmailIcon,
    FacebookIcon,
    TelegramIcon,
    TwitterIcon,
    WhatsappIcon,
} from 'react-share';
import CopyIcon from '@mui/icons-material/ContentCopy';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import React from 'react';
import { toast } from 'react-toastify';
import ShareIcon from '@mui/icons-material/Share';
import CloseIcon from '@mui/icons-material/Close';
import { setShowShareModal } from '../redux/features/common/commonSlice';
import { useDispatch } from 'react-redux';
function ShareModal(props) {
    const dispatch = useDispatch();
    const { url, title, subject } = props;
    return (
        <div>
            <>
                <div className='fixed inset-0 z-50 overflow-y-auto'>
                    <div className='flex items-center min-h-screen px-4 py-8'>
                        <div className='relative w-full  p-10 max-w-2xl mx-auto bg-gray-900 rounded-md shadow-lg space-y-5'>
                            <div className='flex items-center justify-center gap-3'>
                                <ShareIcon
                                    className='text-gray-300'
                                />
                                <p className='text-3xl text-gray-300'>
                                    Share via
                                </p>
                            </div>

                            <div className='grid grid-cols-3 sm:grid-cols-5 gap-2'>
                                <EmailShareButton
                                    className='mx-auto'
                                    onShareWindowClose={() =>
                                        dispatch(setShowShareModal(false))
                                    }
                                    url={url}
                                    title={title}
                                    subject={subject}
                                    windowHeight={600}
                                    windowWidth={1000}>
                                    <EmailIcon className='h-20 w-auto rounded-lg' />
                                    <p className='text-gray-500 font-bold text-sm'>
                                        Email
                                    </p>
                                </EmailShareButton>
                                <FacebookShareButton
                                    className='mx-auto'
                                    onShareWindowClose={() =>
                                        dispatch(setShowShareModal(false))
                                    }
                                    title={title}
                                    url={url}
                                    windowHeight={600}
                                    windowWidth={1000}>
                                    <FacebookIcon className='h-20 w-auto rounded-lg' />
                                    <p className='text-gray-500 font-bold text-sm'>
                                        Facebook
                                    </p>
                                </FacebookShareButton>
                                <TelegramShareButton
                                    className='mx-auto'
                                    onShareWindowClose={() =>
                                        dispatch(setShowShareModal(false))
                                    }
                                    title={title}
                                    url={url}
                                    windowHeight={600}
                                    windowWidth={1000}>
                                    <TelegramIcon className='h-20 w-auto rounded-lg' />
                                    <p className='text-gray-500 font-bold text-sm'>
                                        Telegram
                                    </p>
                                </TelegramShareButton>
                                <TwitterShareButton
                                    className='mx-auto'
                                    onShareWindowClose={() =>
                                        dispatch(setShowShareModal(false))
                                    }
                                    url={url}
                                    title={title}
                                    windowHeight={600}
                                    windowWidth={1000}>
                                    <TwitterIcon className='h-20 w-auto rounded-lg' />
                                    <p className='text-gray-500 font-bold text-sm'>
                                        Twitter
                                    </p>
                                </TwitterShareButton>
                                <WhatsappShareButton
                                    className='mx-auto'
                                    onShareWindowClose={() =>
                                        dispatch(setShowShareModal(false))
                                    }
                                    title={title}
                                    url={url}
                                    windowHeight={600}
                                    windowWidth={1000}>
                                    <WhatsappIcon className='h-20 w-auto rounded-lg' />
                                    <p className='text-gray-500 font-bold text-sm'>
                                        Whatsapp
                                    </p>
                                </WhatsappShareButton>
                            </div>
                            <p className='text-center text-gray-300'>
                                Or copy the link below
                            </p>
                            <div className='flex gap-3 justify-center'>
                                <input
                                    type='text'
                                    className='text-gray-300 text-center rounded-sm py-2 px-3 w-full'
                                    value={url}
                                    disabled
                                />
                                <CopyToClipboard
                                    text={url}
                                    onCopy={() =>
                                        toast.success('Copied to clipboard')
                                    }>
                                    <button>
                                        <CopyIcon />
                                    </button>
                                </CopyToClipboard>
                            </div>
                            <div className='absolute right-4 top-2 cursor-pointer'>
                                <CloseIcon
                                    onClick={() =>
                                        dispatch(setShowShareModal(false))
                                    }
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </>
        </div>
    );
}

export default ShareModal;
