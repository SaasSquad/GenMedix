import EduMaterials from "../components/EduMaterials";

const EduMaterialsPage = () => {
  return (
    <>
      <section className="mx-[4vw] mt-8">
        <EduMaterials title="This is your brain on depression:Creating a Path to Getting Better" link="https://singlelogin.re/book/3675609/233e32/this-is-your-brain-on-depression-creating-a-path-to-getting-better.html?ts=0354" type="book"/>
        <EduMaterials title="Mental well-being: resources for the public" link="https://www.who.int/news-room/feature-stories/mental-well-being-resources-for-the-public" type="website"/>
        <EduMaterials title="Retrain Your Brain - Cognitive Behavioral Therapy in 7 Weeks" link="https://singlelogin.re/book/5249148/c09667/retrain-your-brain-cognitive-behavioral-therapy-in-7-weeks.html" type="book"/>
        <EduMaterials title="Habits of a Happy Brain" link="https://singlelogin.re/book/2834960/ebeaa6/habits-of-a-happy-brain.html" type="book"/>
        <EduMaterials title="The Complete Anxiety Treatment and Homework Planner" link="https://singlelogin.re/book/1067452/c53459/the-complete-anxiety-treatment-and-homework-planner.html" type="book"/>
      </section>
    </>
  );
};

export default EduMaterialsPage;
