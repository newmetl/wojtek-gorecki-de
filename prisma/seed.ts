import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding blog posts...");

  const posts = [
    {
      title: "Der Mut, nichts zu tun",
      slug: "der-mut-nichts-zu-tun",
      excerpt:
        "Warum das Schwierigste manchmal ist, einfach still zu sein — und warum genau dort die Veränderung beginnt.",
      content: `Wir leben in einer Welt, die uns ständig sagt, dass wir etwas tun müssen. Mehr erreichen, mehr optimieren, mehr werden. Aber was, wenn der wichtigste Schritt kein Schritt ist?

## Die Angst vor der Stille

Viele Menschen, die zu mir kommen, berichten von einer inneren Unruhe. Einem Gefühl, dass sie ständig in Bewegung sein müssen — körperlich, emotional, gedanklich. Sobald Stille eintritt, wird sie als unangenehm empfunden. Als Leere, die gefüllt werden muss.

Dabei ist diese Stille kein Mangel. Sie ist ein Raum.

## Was passiert, wenn wir innehalten

In der Stille zeigt sich das, was unter der Oberfläche liegt. Gefühle, die wir lange verdrängt haben. Gedanken, die wir nicht denken wollten. Aber auch: eine Klarheit, die im Lärm des Alltags verloren geht.

Es braucht Mut, sich dem auszusetzen. Nicht den Mut eines Helden, sondern den leisen Mut desjenigen, der bereit ist, ehrlich hinzuschauen.

> Stille ist nicht die Abwesenheit von Geräusch. Sie ist die Anwesenheit von Aufmerksamkeit.

## Ein erster Schritt

Du musst nicht meditieren. Du musst kein Retreat buchen. Manchmal reicht es, fünf Minuten am Tag einfach nur da zu sein. Ohne Handy, ohne Ablenkung, ohne Ziel.

Setz dich hin. Atme. Und lass zu, was kommt.

Das klingt einfach. Und in gewisser Weise ist es das auch. Aber die Einfachheit ist nicht das Gegenteil von Tiefe — sie ist ihr Anfang.`,
      imageUrl:
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80",
      status: "published",
      publishedAt: new Date("2026-03-15T10:00:00Z"),
    },
    {
      title: "Über das Zuhören",
      slug: "ueber-das-zuhoeren",
      excerpt:
        "Wirkliches Zuhören ist mehr als Worte aufnehmen. Es ist die Bereitschaft, den anderen in seiner Ganzheit wahrzunehmen.",
      content: `Es gibt einen Unterschied zwischen Hören und Zuhören. Hören ist ein physiologischer Vorgang. Zuhören ist ein Akt der Liebe.

## Wenn wir wirklich zuhören

Wie oft ertappen wir uns dabei, dass wir im Gespräch bereits die nächste Antwort formulieren, während der andere noch spricht? Wie oft hören wir nur die Worte, aber nicht das, was zwischen den Zeilen liegt?

Wirkliches Zuhören bedeutet, für einen Moment das eigene Ich zur Seite zu stellen. Nicht zu bewerten, nicht zu analysieren, nicht zu reparieren — sondern einfach da zu sein.

## Der Raum, der entsteht

Wenn jemand sich wirklich gehört fühlt, passiert etwas Erstaunliches. Eine Spannung löst sich. Etwas, das festgehalten wurde, darf sich zeigen. Nicht weil wir eine Lösung anbieten, sondern weil wir einen Raum schaffen, in dem alles sein darf.

> Das größte Geschenk, das du einem Menschen machen kannst, ist deine ungeteilte Aufmerksamkeit.

## In der Begegnung

In den offenen Treffen erlebe ich immer wieder, wie heilsam es ist, wenn Menschen einander wirklich zuhören. Ohne Ratschläge, ohne Vergleiche, ohne den Versuch, es besser zu wissen.

Manchmal ist das alles, was es braucht: Jemand, der da ist. Der hört. Der bleibt.

Das klingt so einfach, und vielleicht ist es das auch. Aber es ist eine Einfachheit, die Übung braucht. Die Bereitschaft, immer wieder von vorn zu beginnen.`,
      imageUrl:
        "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?w=1200&q=80",
      status: "published",
      publishedAt: new Date("2026-03-08T10:00:00Z"),
    },
    {
      title: "Was bleibt, wenn alles wegfällt",
      slug: "was-bleibt-wenn-alles-wegfaellt",
      excerpt:
        "Über die Erfahrung, Vorstellungen loszulassen — und dabei etwas zu finden, das schon immer da war.",
      content: `Es gibt Momente im Leben, in denen uns der Boden unter den Füßen weggezogen wird. Ein Verlust, eine Krise, das Scheitern eines Plans, den wir für unser Leben hielten. In solchen Momenten fühlt es sich an, als würden wir fallen.

## Das Loslassen, das kein Entscheid ist

Wir sprechen oft vom Loslassen, als wäre es eine Technik. Etwas, das wir tun können. Aber das wirkliche Loslassen geschieht nicht durch Willenskraft. Es geschieht, wenn wir erkennen, dass das, woran wir festhalten, uns festhält.

Ich spreche hier nicht von einer philosophischen Übung. Ich spreche von dem Moment, in dem sich eine Überzeugung auflöst — eine Vorstellung darüber, wer wir sind, was wir brauchen, wie das Leben sein sollte.

## Die Stille danach

Nach dem Loslassen kommt nicht sofort Klarheit. Zuerst kommt oft: Nichts. Eine Leere, die beängstigend sein kann. Aber wenn wir dieser Leere nicht ausweichen, wenn wir nicht sofort versuchen, sie mit neuen Plänen und Vorstellungen zu füllen, dann zeigt sich etwas.

Etwas Stilles. Etwas, das schon immer da war.

> Nicht das Loslassen ist schwer — schwer ist zu erkennen, dass wir festhalten.

## Kein Ziel, nur Weg

Dieses „Etwas" lässt sich schwer in Worte fassen. Es ist keine Erkenntnis im intellektuellen Sinn. Es ist eher ein Spüren, ein Ankommen. Nicht an einem neuen Ort, sondern an dem Ort, an dem wir immer schon waren.

Die Arbeit, die ich anbiete — ob in den offenen Treffen oder in Einzelgesprächen — dreht sich im Kern um dieses Spüren. Nicht um Methoden oder Techniken, sondern um die Bereitschaft, dem zu begegnen, was ist.

Ohne zu wissen, wohin es führt. Und vielleicht ist genau das der Punkt.`,
      imageUrl:
        "https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?w=1200&q=80",
      status: "published",
      publishedAt: new Date("2026-02-25T10:00:00Z"),
    },
  ];

  for (const post of posts) {
    await prisma.blogPost.upsert({
      where: { slug: post.slug },
      update: post,
      create: post,
    });
    console.log(`  Created/updated: "${post.title}"`);
  }

  console.log("Seeding complete!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
