import React, { useEffect, useState } from 'react';
//Components
import ScrollForMore from '../components/scrollForMore';
//Ease

import { motion, useTransform, useViewportScroll } from 'framer-motion';
import Footer from '../components/footer';

const transition = {
	duration: 1.5,
	ease: [0.43, 0.13, 0.23, 0.96],
};

const firstName = {
	initial: { y: 0 },
	animate: {
		transition: {
			delayChildren: 0.6,
			staggerChildren: 0.04,
			staggerDirection: 1,
		},
	},
};

const lastName = {
	initial: { y: 0 },
	animate: {
		transition: {
			delayChildren: 0.6,
			staggerChildren: 0.04,
			staggerDirection: -1,
		},
	},
};

const letter = {
	initial: { y: 400 },
	animate: {
		y: 0,
		transition: {
			duration: 1,
			...transition,
		},
	},
};

const Model = ({ imageDetails }) => {
	const { scrollYProgress } = useViewportScroll();
	const scale = useTransform(scrollYProgress, [0, 1], [1.1, 1.25]);
	// const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
	// const y = useTransform(scrollYProgress, [0, 0.5], [0, 300]);
	// const x = useTransform(scrollYProgress, [0, 0.5], [0, 200]);

	const [canScroll, setCanScroll] = useState(false);

	useEffect(() => {
		if (canScroll === false) {
			document.querySelector('body').classList.add('no-scroll');
		} else {
			document.querySelector('body').classList.remove('no-scroll');
		}
	}, [canScroll]);

	const heading = 'Framer Motion';

	return (
		<motion.div
			onAnimationComplete={() => setCanScroll(true)}
			initial='initial'
			animate='animate'
			exit='exit'
			className='single'
		>
			<div className='container fluid'>
				<div className='row center top-row'>
					<div className='top'>
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{
								opacity: 1,
								y: 0,
								transition: { delay: 1.2, ...transition },
							}}
							className='details'
						>
							<div className='location'>
								<span>Implementing Page Transitions</span>
							</div>
							<div className='mua'>Author: @its-azharmalik</div>
						</motion.div>
						<motion.div className='model'>
							{heading.split(' ').map((w, i) => {
								return (
									<motion.span
										variants={i % 2 ? firstName : lastName}
										className={
											i !== heading.split(' ').length - 1 ? 'first' : 'last'
										}
									>
										{w.split('').map((l, ind) => {
											return (
												<motion.span key={ind} variants={letter}>
													{l}
												</motion.span>
											);
										})}
									</motion.span>
								);
							})}
						</motion.div>
					</div>
				</div>
				<div className='row bottom-row'>
					<div className='bottom'>
						<div className='image-container-single'>
							<motion.div
								initial={{
									y: '-50%',
									width: imageDetails.width,
									height: imageDetails.height,
								}}
								animate={{
									y: 0,
									width: '100%',
									height: window.innerWidth > 1440 ? 600 : 450,
									transition: { delay: 0.2, ...transition },
								}}
								className='thumbnail-single'
							>
								<div className='frame-single'>
									<motion.img
										style={{ scale }}
										initial={{
											scale: 1.1,
										}}
										animate={{
											transition: {
												delay: 0.2,
												...{ duration: 1.5, ease: [0.43, 0.13, 0.23, 0.96] },
											},
											y: window.innerWidth > 1440 ? -900 : -450,
										}}
										src={require('../images/pic.jpg')}
										alt='an image'
									/>
								</div>
							</motion.div>
						</div>
					</div>
					<ScrollForMore />
				</div>
			</div>
			<div className='detailed-information'>
				<div className='container'>
					<div className='row'>
						<h2 className='title'>
							Creating Engaging Page Transitions <br /> with Framer Motion
						</h2>
						<p>
							Page transitions can significantly improve the user experience by
							providing a sense of continuity between different views in a web
							application. In this post, I will explain how I used Framer Motion
							to create smooth animations for a project. I'll cover how I
							achieved staggered text animations, dynamic scroll-based effects,
							and ensured a seamless experience using scroll control.
							<br />
							<br />
							Framer Motion is a powerful animation library that integrates
							directly with React, allowing for declarative animations that are
							easy to implement. Its key advantage is the flexibility to create
							complex animations, such as motion-based interactions, with
							minimal code. For this project, I aimed to create a smooth
							transition effect where the heading text animates letter by
							letter, and the image responds dynamically to scroll events.
							Framer Motion provides declarative animations, meaning we define
							how elements should animate in and out, and the library handles
							the mechanics of those animations. In this case, I implemented
							staggered animations for the heading text, as well as a smooth
							scaling effect for the image as the user scrolls. The transition
							effect was customized to create a natural movement, with a longer
							duration and easing settings that give it a nice flow.
						</p>
					</div>
					<div className='row'>
						<h2 className='title'>
							How the Animations Work <br /> Techniques & Tools
						</h2>
						<p>
							The heading text animation uses a combination of{' '}
							<strong>staggerChildren</strong>
							and <strong>delayChildren</strong> in Framer Motion, which allows
							each letter of the heading to animate sequentially, giving it a
							wave-like effect. This is done using motion variants, where the
							letters start from an offset position and then move into place.
							The key advantage of Framer Motion here is its ability to break
							down animations into smaller components, such as individual
							letters, and apply animations to each. The image zoom effect is
							driven by the <strong>useViewportScroll</strong> and
							<strong>useTransform</strong> hooks provided by Framer Motion.
							These hooks allow the animation to be linked with the user's
							scroll progress, scaling the image in real-time. This creates a
							dynamic effect where the image becomes larger as the user scrolls
							down, making the entire animation feel responsive and immersive.
							<br />
							<br />
							To prevent the page from scrolling until the animation completes,
							I used React's <strong>useState</strong> and{' '}
							<strong>useEffect</strong> hooks to control the `canScroll` state.
							By disabling scrolling initially, I ensure that the animation gets
							the full attention it deserves before allowing the user to explore
							the rest of the page.
						</p>
					</div>
					<div className='row'>
						<h2 className='title'>
							Heading Animation <br /> Staggering Letters
						</h2>
						<p>
							One of the most visually compelling aspects of the animation is
							the way each letter of the heading animates independently. This
							staggered animation creates a wave-like effect as the text appears
							on the screen. Here’s how it’s done:
							<br />
							<br />
							<code>
								{` const firstName = {
  initial: { y: 0 },
  animate: {
    transition: {
      delayChildren: 0.6,
      staggerChildren: 0.04,
      staggerDirection: 1,
    },
  },
};

const lastName = {
  initial: { y: 0 },
  animate: {
    transition: {
      delayChildren: 0.6,
      staggerChildren: 0.04,
      staggerDirection: -1,
    },
  },
};

const letter = {
  initial: { y: 400 },
  animate: {
    y: 0,
    transition: {
      duration: 1,
      ease: [0.43, 0.13, 0.23, 0.96],
    },
  },
};`}
							</code>
						</p>
					</div>
					<Footer />
				</div>
			</div>
		</motion.div>
	);
};

export default Model;
