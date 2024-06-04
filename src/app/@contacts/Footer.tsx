import Link from 'next/link';

const Footer = () => {
    return (
        <>
            <hr className=' bg-teal-500 h-3 '/>
            <div className=' bg-blue-900 text-center'>
                <div className='flex justify-around py-8'>
                    <div>
                        <div className="flex top-soc space-x-3">
                            <a data-track="twitter" href="https://twitter.com/GawdGambit" target="_blank" className="link-s w-inline-block">
                            <img src="https://assets-global.website-files.com/6257adef93867e50d84d30e2/65a4fe4237b6a1c4fa714f76_x.svg" loading="lazy" alt="Twitter" className="image" /></a>
                            <a data-track="instagram" href="https://www.instagram.com/ani_r_baan/" target="_blank" className="link-s w-inline-block">
                            <img src="https://assets-global.website-files.com/6257adef93867e50d84d30e2/65a4fe42d907d27f3dead7a0_instagram.svg" loading="lazy" alt="Instagram" className="image" /></a>
                            <a data-track="facebook" href="https://www.facebook.com/profile.php?id=61553104123672" target="_blank" className="link-s w-inline-block">
                            <img src="https://assets-global.website-files.com/6257adef93867e50d84d30e2/65a4fe4173c1df8be608c8a2_facebook.svg" loading="lazy" alt="Facebook" className="image" /></a>
                            <a data-track="youtube" href="https://www.youtube.com/@Amaster-tw5mo" target="_blank" className="link-s w-inline-block">
                            <img src="https://assets-global.website-files.com/6257adef93867e50d84d30e2/65a4fe42d907d27f3dead7ad_youtube.svg" loading="lazy" alt="Youtube" className="image" /></a>
                        </div>
                        <p className="copyright mt-16">
                        &copy; {new Date().getFullYear()} Convoke
                    </p>
                    </div>
                    
                <div id="node">
                    <div className=' text-xl font-semibold'>Product</div>
                    <ul>
                        <li><a>Download</a></li>
                        <li><a>Premium</a></li>
                        <li><a>Status</a></li>
                        <li><a>App Directory</a></li>
                    </ul>
                </div>
                <div>
                    <div className=' text-xl font-semibold'>Resources</div>
                    <ul>
                        <li><a>College</a></li>
                        <li><a>Support</a></li>
                        <li><a>Safety</a></li>
                        <li><a>Blog</a></li>
                        <li><a>Feedback</a></li>
                        <li><a>Gaming</a></li>
                        <li><a>Quests</a></li>
                    </ul>
                </div>
                <div>
                    <div className=' text-xl font-semibold'>Policies</div>
                    <ul>
                        <li><a>Terms</a></li>
                        <li><a>Privacy</a></li>
                        <li><a>Cookie Settings</a></li>
                        <li><a>Guidelines</a></li>
                        <li><a>Acknowledgements</a></li>
                        <li><a>Licenses</a></li>
                    </ul>
                </div>
                </div>
            </div>
        </>
    );
};

export default Footer;
