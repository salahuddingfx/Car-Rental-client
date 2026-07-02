import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, Tag, User, Share2 } from 'lucide-react';
import { Breadcrumbs } from '../components/Breadcrumbs';

const blogPosts: Record<string, {
  title: string;
  category: string;
  date: string;
  readTime: string;
  author: string;
  image: string;
  content: string[];
}> = {
  'top-10-road-trip-routes-from-dhaka': {
    title: 'Top 10 Road Trip Routes from Dhaka',
    category: 'Travel',
    date: '2026-06-25',
    readTime: '5 min',
    author: 'Apex Ride Team',
    image: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?auto=format&fit=crop&q=80&w=1200',
    content: [
      'Bangladesh offers some of the most scenic driving routes in South Asia. From winding coastal roads to misty hill tracks, there\'s a journey for every type of driver.',
      '1. Dhaka to Cox\'s Bazar via the Marine Drive — This 400km route takes you through the heart of Bangladesh to the world\'s longest natural sandy beach. The Marine Drive section alone is worth the trip, hugging the Bay of Bengal with breathtaking views.',
      '2. Dhaka to Sylhet via the Tea Gardens — Wind through the lush green tea estates of Sylhet. The final stretch through Srimangal\'s rolling hills is pure driving bliss, especially during the monsoon when everything is emerald green.',
      '3. Dhaka to Bandarban — The hill tracts offer winding mountain roads that challenge even experienced drivers. The golden Buddha statue and tribal villages make every hairpin turn worthwhile.',
      '4. Dhaka to Saint Martin\'s Island — Take the Teknaf route for an epic coastal drive ending at Bangladesh\'s only coral island. The road alongside the Naf River is stunning during sunset.',
      '5. Dhaka to Rangamati — Lake Kaptai and the surrounding hills create a dramatic backdrop. Drive slowly and stop at the hanging bridge for photos.',
      'For the best experience, we recommend renting one of our SUVs for the hill routes or a luxury sedan for the coastal highways. Each vehicle in our fleet is maintained to handle Bangladesh\'s diverse terrain.',
    ],
  },
  'electric-cars-in-bangladesh': {
    title: 'Electric Cars in Bangladesh: What You Need to Know',
    category: 'EV Guide',
    date: '2026-06-18',
    readTime: '7 min',
    author: 'Apex Ride Team',
    image: 'https://images.unsplash.com/photo-1619767886558-efdc259cde1a?auto=format&fit=crop&q=80&w=1200',
    content: [
      'Electric vehicles are rapidly gaining traction in Bangladesh. With improving charging infrastructure and competitive running costs, EVs make more sense than ever for Dhaka\'s urban environment.',
      'The charging landscape: DCash, Energypac, and several private operators have installed fast chargers across Dhaka, Chattogram, and the highway corridors. A full charge now takes 30-45 minutes at a DC fast charger.',
      'Cost savings: Running an EV in Bangladesh costs approximately ৳1.5 per km compared to ৳8-12 per km for petrol cars. That\'s a massive difference over a rental period.',
      'Our EV fleet includes the Tesla Model X Plaid, BYD Atto 3, and MG ZS EV — each offering different ranges and performance levels. The Model X Plaid delivers supercar acceleration with zero emissions.',
      'Range anxiety is a thing of the past for Dhaka-Chattogram highway trips. Multiple charging stations along the 250km route mean you can complete the journey with one stop.',
      'For city driving, EVs are particularly advantageous. Instant torque makes navigating Dhaka\'s traffic effortless, and regenerative braking recovers energy during the constant stop-start.',
    ],
  },
  'luxury-vs-sports-car': {
    title: 'Luxury vs Sports Car: Which Should You Rent?',
    category: 'Lifestyle',
    date: '2026-06-10',
    readTime: '4 min',
    author: 'Apex Ride Team',
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=1200',
    content: [
      'The eternal question for car enthusiasts: do you choose the refined comfort of a luxury sedan or the heart-pounding excitement of a sports car? Here\'s our guide to help you decide.',
      'Choose a Luxury Car if: You\'re planning a business trip, a special date night, or simply want to arrive in style. Our Mercedes-Maybach S680 and Rolls-Royce Cullinan offer rear-seat experiences that rival first-class flights.',
      'Choose a Sports Car if: You want to feel every curve of the road. The Porsche 911 GT3 RS and Aston Martin Vantage deliver raw, unfiltered driving experiences that remind you why you love cars.',
      'For road trips: Luxury cars win for long-distance comfort. Climate-controlled seats, noise cancellation, and smooth suspension make 400km feel like 100km. But a sports car on a winding mountain road? Unforgettable.',
      'For Instagram: Both categories photograph beautifully, but supercars get more attention. Our Lamborghini Huracán Spyder consistently stops traffic.',
      'Our recommendation? Book both. Start with a luxury car for the journey, then switch to a sports car for the weekend. That\'s the beauty of Apex Ride — variety at your fingertips.',
    ],
  },
  'safe-driving-tips-bangladesh': {
    title: 'Safe Driving Tips for Bangladesh Highways',
    category: 'Safety',
    date: '2026-06-02',
    readTime: '6 min',
    author: 'Apex Ride Team',
    image: 'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&q=80&w=1200',
    content: [
      'Driving in Bangladesh requires patience, awareness, and respect for local road culture. Here are essential tips for a safe and enjoyable journey.',
      'Speed management: Highways often have unexpected obstacles — rickshaws, animals, and slow-moving trucks. Maintain a speed that allows you to stop safely. Our GPS speed alerts help you stay aware.',
      'Night driving: Avoid highway driving after dark when possible. Poor lighting and unpredictable traffic make night driving challenging. If necessary, use high beams judiciously and reduce speed.',
      'Monsoon preparedness: During June-September, roads can flood quickly. Our SUVs handle waterlogged roads better than sedans. Avoid standing water of unknown depth.',
      'Communication: Use the horn generously — it\'s not rude, it\'s essential communication on Bangladeshi roads. A friendly honk before overtaking prevents surprises.',
      'Our vehicles come equipped with dashcams and emergency kits. In case of any incident, contact our 24/7 support line immediately. We\'re always here to help.',
    ],
  },
  'how-apex-ride-maintains-fleet-quality': {
    title: 'How Apex Ride Maintains Fleet Quality',
    category: 'Company',
    date: '2026-05-28',
    readTime: '3 min',
    author: 'Apex Ride Team',
    image: 'https://images.unsplash.com/photo-1617531653332-bd46c24f2068?auto=format&fit=crop&q=80&w=1200',
    content: [
      'Every vehicle in the Apex Ride fleet undergoes a rigorous 150-point inspection before and after each rental period. Here\'s what that process looks like.',
      'Pre-rental inspection: Our certified mechanics check everything from tire tread depth to brake pad thickness, fluid levels, air conditioning performance, and interior cleanliness.',
      'Exterior detailing: Each car is hand-washed, clay-barred, and waxed between rentals. Any new scratches or dents are documented and repaired immediately.',
      'Interior deep clean: Full vacuuming, leather conditioning, dashboard treatment, and odor elimination. Our standards exceed those of premium car dealerships.',
      'Mechanical audit: Engine diagnostics, transmission check, suspension inspection, and electrical system test. We use OEM parts exclusively for all replacements.',
      'The result? Every Apex Ride vehicle feels brand new, every single time. That\'s our promise to you.',
    ],
  },
  'coxs-bazar-in-a-supercar': {
    title: 'Cox\'s Bazar in a Supercar: A Weekend Guide',
    category: 'Travel',
    date: '2026-05-20',
    readTime: '5 min',
    author: 'Apex Ride Team',
    image: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?auto=format&fit=crop&q=80&w=1200',
    content: [
      'Imagine arriving at the world\'s longest beach in a Lamborghini Huracán Spyder. The heads will turn, the cameras will flash, and the memories will last forever.',
      'Day 1: Depart Dhaka early morning. The 8-hour drive through the highway is an experience in itself in a supercar. Stop at Himchari National Park for photos with the mountain backdrop.',
      'Day 2: Hit the Marine Drive at sunrise — empty roads, ocean on one side, hills on the other. Visit Inani Beach for its unique rock formations. Evening at the beach with the top down.',
      'Day 3: Visit the Teknaf mangrove forest, then begin the return journey. The supercar\'s adaptive suspension handles the highway curves beautifully.',
      'Pro tips: Book our supercar weekend package for the best rate. Include full insurance coverage for peace of mind. And don\'t forget your sunglasses — you\'ll need them.',
    ],
  },
};

const slugify = (title: string) => title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

export const BlogPost: React.FC = () => {
  const { slug } = useParams();
  const post = slug ? blogPosts[slug] : null;

  if (!post) {
    return (
      <div className="pt-24 pb-20 bg-light-bg dark:bg-neutral-950 min-h-screen flex flex-col items-center justify-center">
        <p className="text-neutral-500 dark:text-neutral-400 mb-4">Article not found</p>
        <Link to="/blog" className="text-accent-blue text-sm hover:underline">Back to Blog</Link>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-20 bg-light-bg dark:bg-neutral-950 min-h-screen">
      <div className="max-w-3xl mx-auto px-6">
        <Breadcrumbs items={[{ label: 'Blog', href: '/blog' }, { label: post.title }]} />

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Link to="/blog" className="inline-flex items-center gap-1.5 text-xs text-neutral-500 dark:text-neutral-400 hover:text-accent-blue mb-6 transition-colors">
            <ArrowLeft size={14} /> Back to Blog
          </Link>

          <div className="h-64 sm:h-80 rounded-2xl overflow-hidden mb-8">
            <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
          </div>

          <div className="flex items-center gap-3 mb-4">
            <span className="text-[10px] font-display font-bold uppercase tracking-widest text-accent-blue bg-accent-blue/10 px-2.5 py-1 rounded-full flex items-center gap-1">
              <Tag size={9} /> {post.category}
            </span>
            <span className="text-[10px] text-neutral-400 dark:text-neutral-500 flex items-center gap-1"><Clock size={10} /> {post.readTime}</span>
            <span className="text-[10px] text-neutral-400 dark:text-neutral-500">{post.date}</span>
          </div>

          <h1 className="font-display text-2xl sm:text-3xl md:text-4xl font-extrabold text-neutral-900 dark:text-neutral-100 mb-6 leading-tight">{post.title}</h1>

          <div className="flex items-center gap-3 mb-8 pb-6 border-b border-neutral-200 dark:border-neutral-800">
            <div className="w-9 h-9 rounded-full bg-accent-blue/10 flex items-center justify-center">
              <User size={16} className="text-accent-blue" />
            </div>
            <div>
              <p className="text-xs font-bold text-neutral-800 dark:text-neutral-200">{post.author}</p>
              <p className="text-[10px] text-neutral-500 dark:text-neutral-400">Published {post.date}</p>
            </div>
            <a href={`https://wa.me/?text=${encodeURIComponent(`${post.title} - ${window.location.href}`)}`}
              target="_blank" rel="noopener noreferrer"
              className="ml-auto p-2 border border-neutral-200 dark:border-neutral-700 rounded-lg hover:border-green-300 hover:text-green-600 transition-colors">
              <Share2 size={14} />
            </a>
          </div>

          <div className="space-y-5">
            {post.content.map((para, i) => (
              <p key={i} className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">{para}</p>
            ))}
          </div>

          <div className="mt-12 pt-8 border-t border-neutral-200 dark:border-neutral-800">
            <h3 className="font-display text-sm font-bold text-neutral-800 dark:text-neutral-200 uppercase tracking-wider mb-4">More Articles</h3>
            <div className="grid grid-cols-2 gap-4">
              {Object.entries(blogPosts).filter(([key]) => key !== slug).slice(0, 2).map(([key, p]) => (
                <Link key={key} to={`/blog/${key}`} className="group">
                  <div className="h-24 rounded-xl overflow-hidden mb-2">
                    <img src={p.image} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <p className="text-xs font-bold text-neutral-800 dark:text-neutral-200 group-hover:text-accent-blue transition-colors line-clamp-2">{p.title}</p>
                </Link>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
