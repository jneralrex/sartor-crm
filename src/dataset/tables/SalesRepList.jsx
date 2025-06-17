import salesrep from '../../assets/images/salesrep.png';

// components/SalesRepList.jsx
const reps = [
  { image: '/images/mikky.jpg', name: 'Mikky Olashola', score: 2321 },
  { image: '/images/kenny.jpg', name: 'Kenny Shin', score: 2323 },
   { image: '/images/mikky.jpg', name: 'Mikky Olashola', score: 2321 },
  { image: '/images/kenny.jpg', name: 'Kenny Shin', score: 2323 },
   { image: '/images/mikky.jpg', name: 'Mikky Olashola', score: 2321 },
  { image: '/images/kenny.jpg', name: 'Kenny Shin', score: 2323 },
 { image: '/images/kenny.jpg', name: 'Kenny Shin', score: 2323 },

  // ... Add others
];

export default function SalesRepList() {
  return (
    <div className="bg-primary_white p-6 rounded-xl shadow-sm w-full md:max-w-sm">
      <h2 className="text-[14px] sm:text-[16px] md:text-[20px] font-semibold mb-4 font-[sfpro] text-center md:text-start">Top Sales Rep</h2>
      <ul className="space-y-4 mt-[15px] flex flex-col gap-2">
        {reps.map((rep, i) => (
          <li key={i} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img src={salesrep} alt={rep.name} className="w-10 h-10 rounded-full object-cover" />
              <span className='font-medium text-[14px] text-[#484848] underline font-[sfpro]'>{rep.name}</span>
            </div>
            <span className="font-medium text-[#767676] text-[14px] font-[sfpro]">{rep.score}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
