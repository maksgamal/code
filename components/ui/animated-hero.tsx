import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { MoveRight, Zap, Users, Search, CreditCard } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import Link from 'next/link'

function Hero() {
  const [titleNumber, setTitleNumber] = useState(0)
  const titles = useMemo(() => ['Advanced', 'Powerful', 'Intelligent', 'Efficient', 'Modern'], [])

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (titleNumber === titles.length - 1) {
        setTitleNumber(0)
      } else {
        setTitleNumber(titleNumber + 1)
      }
    }, 2000)
    return () => clearTimeout(timeoutId)
  }, [titleNumber, titles])

  const features = [
    {
      icon: Search,
      title: 'Advanced Prospecting',
      description: '20+ filters to find your ideal leads'
    },
    {
      icon: Users,
      title: 'Team Collaboration',
      description: 'Share lists and manage credits across your team'
    },
    {
      icon: CreditCard,
      title: 'Transparent Pricing',
      description: 'Pay only for what you unlock - no hidden fees'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <header className="flex items-center justify-between py-6">
          <div className="flex items-center gap-2">
            <Zap className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900">LeadFuel</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/sign-in">
              <Button variant="ghost">Sign In</Button>
            </Link>
            <Link href="/sign-up">
              <Button>Get Started</Button>
            </Link>
          </div>
        </header>

        {/* Hero Section */}
        <div className="flex flex-col items-center justify-center gap-8 py-20 lg:py-32">
          <div className="text-center max-w-4xl">
            <h1 className="font-regular text-5xl md:text-7xl tracking-tight mb-6">
              <span className="relative flex w-full justify-center overflow-hidden text-center">
                {titles.map((title, index) => (
                  <motion.span
                    key={index}
                    className="absolute font-semibold text-blue-600"
                    initial={{ opacity: 0, y: '-100' }}
                    transition={{ type: 'spring', stiffness: 50 }}
                    animate={
                      titleNumber === index
                        ? {
                            y: 0,
                            opacity: 1,
                          }
                        : {
                            y: titleNumber > index ? -150 : 150,
                            opacity: 0,
                          }
                    }
                  >
                    {title}
                  </motion.span>
                ))}
              </span>
              <br />
              <span className="text-gray-900">Lead Generation</span>
            </h1>

            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Find, enrich, and unlock high-quality B2B leads with our advanced prospecting platform. 
              Built for sales teams, recruiters, and growth agencies.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/sign-up">
                <Button size="lg" className="gap-2">
                  Start Free Trial <MoveRight className="h-4 w-4" />
                </Button>
              </Link>
              <Button size="lg" variant="outline">
                Watch Demo
              </Button>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 max-w-4xl w-full">
            {features.map((feature, index) => (
              <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="mx-auto w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                    <feature.icon className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                  <p className="text-gray-600 text-sm">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Social Proof */}
          <div className="mt-16 text-center">
            <p className="text-gray-500 text-sm mb-4">Trusted by sales teams at</p>
            <div className="flex items-center justify-center gap-8 opacity-60">
              <div className="text-lg font-semibold">TechCorp</div>
              <div className="text-lg font-semibold">StartupXYZ</div>
              <div className="text-lg font-semibold">GrowthCo</div>
              <div className="text-lg font-semibold">SalesForce</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export { Hero }