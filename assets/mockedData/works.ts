import { ColumnType } from "~/assets/common";

export const mockedWorks = Array.from(new Array(5)).map((_, index) => ({
  title: "22 square metre apartment in Kypseli.",
  slug: "22-square-metre-apartment-in-kypseli-" + index,
  description: `<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quae similitudo in genere etiam humano apparet. Philosophi autem in suis lectulis plerumque moriuntur. Hoc non est positum in nostra actione. Et hi quidem ita non sola virtute finem bonorum contineri putant, ut rebus tamen omnibus virtutem anteponant; Compensabatur, inquit, cum summis doloribus laetitia. Duo Reges: constructio interrete. Fortasse id optimum, sed ubi illud: Plus semper voluptatis? Ut alios omittam, hunc appello, quem ille unum secutus est. </p>
<p><b>Idemque diviserunt naturam hominis in animum et corpus.</b> Quarum ambarum rerum cum medicinam pollicetur, luxuriae licentiam pollicetur. <b>Oratio me istius philosophi non offendit;</b> Progredientibus autem aetatibus sensim tardeve potius quasi nosmet ipsos cognoscimus. Vitiosum est enim in dividendo partem in genere numerare. Quid enim possumus hoc agere divinius? Etenim semper illud extra est, quod arte comprehenditur. Egone non intellego, quid sit don Graece, Latine voluptas? Itaque ab his ordiamur. </p>
<p>Facillimum id quidem est, inquam. Si mala non sunt, iacet omnis ratio Peripateticorum. <b>Poterat autem inpune;</b> Fortemne possumus dicere eundem illum Torquatum? Piso igitur hoc modo, vir optimus tuique, ut scis, amantissimus. Deinde disputat, quod cuiusque generis animantium statui deceat extremum. <b>Nos commodius agimus.</b> Nihilo beatiorem esse Metellum quam Regulum. Nos vero, inquit ille; Non est igitur voluptas bonum. </p>
`,
  images: ["/1.png", "/2.png"],
  location: "Athens",
  year: "2021",
  tags: ["Small space", "Commercial"],
}));

export const works = mockedWorks.map((work, index) => {
  const {
    images: [image1, image2],
    ...data
  } = work;

  let columnData = [
    { data, type: ColumnType.Description },
    { data: image1, type: ColumnType.Image },
    { data: image2, type: ColumnType.Image },
  ];

  // re-order columns
  for (let times = 0; times < index % columnData.length; times++) {
    columnData.unshift(columnData.pop() as (typeof columnData)[number]);
  }

  return columnData;
});
