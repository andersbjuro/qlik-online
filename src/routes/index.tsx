import { createFileRoute, Link } from '@tanstack/react-router'
import { Header } from 'src/components/header';
import { buttonVariants } from 'src/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from "src/components/ui/card";

export const Route = createFileRoute('/')({
  component: Home,
})

function Home() {

  interface Feature {
    title: string;
    description: string;
  }

  const features: Feature[] = [
    { title: "Vad omfattar verktyget?", description: "Informationen du kan finna baseras på fordon i trafik registrerade efter år 2000, exklusive bilhandel och importerade fordon. Fordonsdata om personbilar och lätta lastbilar är begränsad till fabrikat som representeras av medlemsföretagen i branschorganisationen BIL Sweden, vilka står för närmare 99 % av nybilsförsäljningen i Sverige." },
    { title: "Hitta rätt fordonsägare", description: "Du hittar enkelt rätt fordonsägare genom att begränsa din sökning med bland annat: Geografisk region, Fordon, Ägare" },
    { title: "Betala enbart per post", description: "När du använder vårt verktyg betalar du ingen startavgift utan debiteras endast en krona per levererad post. (Dock tillämpar vi en minimiavgift på 900 kronor per beställning.)" }
  ]

  return (
    <div>
      <Header />
      <div>
        <section className="relative py-5">
          <div className="flex flex-col items-center text-center space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">Vårt kampanjverktyg</h1>
            <p className="max-w-[700px] text-muted-foreground ">
              Forba Systems är ett webbaserat verktyg för företag som arbetar med kampanjer riktade till fordonsägare. Verktyget är utformat för att vara så enkelt som möjligt att använda, samtidigt som det motsvarar de förväntningar som kan ställas på ett professionellt kampanjverktyg.
            </p>
            <div className="flex flex-col sm:flex-row mt-5">
              <Link to="/dashboard" className={buttonVariants({ size: "lg" })} >
                Qlik Applikationer
              </Link>
              {/* <Link to="/login" className={buttonVariants({ size: "lg" })}  hidden={session ? true : false}>
              Logga in
            </Link> */}
            </div>
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-5 p-2">
          {features.map((feature, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle>
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </section>
      </div>
    </div>
  )
}
