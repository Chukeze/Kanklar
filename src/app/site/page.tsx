import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { pricingCards } from "@/lib/constants";
import clsx from "clsx";
import { Check } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="">
      <section className="h-full w-full pt-36 relative flex items-center justify-center flex-col ">
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#161616_1px,transparent_1px), linear-gradient (to_bottom,#161616_1px, transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_505_at_50%_0%,#000_70%,transparent_110%)]" />
        <p className="text-center">Run your world, in one place</p>
        <div className="bg-gradient-to-r from-primary to-secondary-foreground text-transparent bg-clip-text relative">
          <h1 className="text-9xl font-bold text-center md:text-[300px]">
            Kanklar
          </h1>
        </div>
        <div className="flex justify-center items-center relative md:mt-[-70px]">
          <Image
            src={'/assets/preview.png'}
            alt="banner image"
            height={1200}
            width={1200}
            className="rounded-tl-2xl rounded-tr-2xl border-2 border-muted"
          />
          <div className="bottom-0 bg-gradient-to-t .top-[50%] dark:from-background left-0 right-0 absolute z-10"></div>
        </div>
      </section>
      <section className="flex justify-center item-center flex-col gap-4 md:!mt-20 mt-[-60px]">
        <h2 className="text-4xl text-center">Choose what fits you right</h2>
        <p className="text-muted-foreground text-center">
          Our Sleek design, straightforward pricing allow you to tailor the
          application to fulfill your needs. if {" you're"} not <br /> Ready to
          express the luxury of no stress you can get started for free
        </p>
        <section className="flex justify-center gap-4 flex-wrap mt-6">
          {pricingCards.map((card) => (
            //WIP: Stripe Wire Up
            <Card
              key={card.title}
              className={clsx('w-[300px] flex flex-col justify-between', {
                'border-2 border-primary': card.title === 'Unlimited Saas',
              })}
            >
              <CardHeader>
                <CardTitle
                  className={clsx('', {
                    'text-muted-foreground': card.title !== 'Unlimited Saas',
                  })}
                >
                  {card.title}
                </CardTitle>
                <CardDescription>{card.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <span className="text-4xl font-bold">{card.price}</span>
                <span className="text-muted-foreground">/m</span>
              </CardContent>
              <CardFooter>
                  <ul>
                    {card.features.map((feature) => (
                      <li key={feature} className="flex gap-2 items-center">
                        <Check className="text-muted-foreground"/>
                        <p>{feature}</p>
                      </li>
                    ))}
                  </ul>
                  <Link href={`/agency?plan=${card.priceId}`} className={clsx("w-full text-center bg-primary p-2 rounded-md", {'!bg-muted-foreground': card.title !== 'Unlimited Saas'})}>
                    Get Started
                  </Link>
              </CardFooter>
            </Card>
          ))}
        </section>
      </section>
    </main>
  )
}
