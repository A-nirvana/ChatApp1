import Link from 'next/link';

const Footer = () => {
    return (
        <>
            <hr className=' bg-teal-500 h-3 '/>
            <div className=' bg-blue-900'>
                <div>
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
                    <p className="copyright">
                        &copy; {new Date().getFullYear()} Convoke
                    </p>
                    </div>
                <div id="w-node-_205fcd10-f41c-19e7-855a-15227d050191-7d05013a" className='flex'>
                    <div className=" flex flex-col">Product</div>
                    <a data-track="download" href="https://discord.com/download">Download</a>
                    <a data-track="nitro" href="https://discord.com/nitro">Premium</a>
                    <a data-track="status" href="https://discordstatus.com/">Status</a>
                    <a data-track="app directory" href="https://discord.com/application-directory">App Directory</a>
                    </div><div id="w-node-_205fcd10-f41c-19e7-855a-15227d0501a9-7d05013a"><div className="paragraph-small top-marg font-blue">Resources</div>
                    <a data-track="college" href="https://discord.com/college">College</a>
                    <a data-track="support" href="https://support.discord.com/hc">Support</a>
                    <a data-track="safety" href="https://discord.com/safety">Safety</a>
                    <a data-track="blog" href="https://discord.com/blog">Blog</a>
                    <a data-track="feedback" href="https://support.discord.com/hc/en-us/community/topics">Feedback</a>
                    <a data-track="Build" href="https://discord.com/gaming">Gaming</a>
                    <a data-track="Build" href="https://discord.com/quests">Quests</a>
                    <a data-track="store" href="https://discordmerch.com/evergreenfooter" target="_blank">Official 3rd Party Merch</a>
                    </div><div id="w-node-_205fcd10-f41c-19e7-855a-15227d0501c4-7d05013a"><div className="paragraph-small top-marg font-blue">Policies</div>
                    <a data-track="terms" href="/terms">Terms</a>
                    <a data-track="privacy" href="/privacy">Privacy</a>
                    <a data-open-cookie-settings="true" href="#">Cookie Settings</a>
                    <a data-track="guidelines" href="/guidelines">Guidelines</a>
                    <a data-track="acknowledgement" href="https://discord.com/acknowledgements">Acknowledgements</a>
                    <a data-track="licenses" href="https://discord.com/licenses">Licenses</a>
                    </div>
                    </div></div>
        </>
    );
};

export default Footer;
