import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t bg-white/70 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

          {/* Brand */}
          <div>
            <h2 className="text-xl font-bold text-orange-500">
              AI Trip Planner
            </h2>
            <p className="mt-3 text-sm text-muted-foreground">
              Plan smarter trips with AI.  
              Flights, hotels & itineraries in seconds.
            </p>
          </div>

          {/* Product */}
          <div>
            <h3 className="font-semibold mb-3">Product</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/create-new-trip">Create Trip</Link></li>
              <li><Link href="/my-trips">My Trips</Link></li>
              <li><Link href="/pricing">Pricing</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold mb-3">Company</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="#">About</Link></li>
              <li><Link href="#">Contact</Link></li>
              <li><Link href="#">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Social / CTA */}
          <div>
            <h3 className="font-semibold mb-3">Stay Connected</h3>
            <p className="text-sm text-muted-foreground mb-3">
              Follow updates & new features.
            </p>
            <div className="flex gap-3">
              <div className="h-9 w-9 rounded-full bg-orange-100 flex items-center justify-center text-orange-500 cursor-pointer">
                🐦
              </div>
              <div className="h-9 w-9 rounded-full bg-orange-100 flex items-center justify-center text-orange-500 cursor-pointer">
                💼
              </div>
              <div className="h-9 w-9 rounded-full bg-orange-100 flex items-center justify-center text-orange-500 cursor-pointer">
                📸
              </div>
            </div>
          </div>

        </div>

        {/* Bottom */}
        <div className="mt-10 pt-6 border-t text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} AI Trip Planner. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
