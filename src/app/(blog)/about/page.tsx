import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="w-full flex flex-col justify-center items-center pt-16">
      <div className="max-w-xl flex flex-col justify-start items-center gap-2 mb-8">
        <Image
          src="https://img-typora-irving.oss-cn-shanghai.aliyuncs.com/blog/avatar.png"
          alt="avatar"
          width={240}
          height={240}
          className="rounded-full aspect-square object-cover shadow-xl ring-2 ring-gray-200 dark:ring-gray-700"
        />
        <h1 className="text-4xl font-bold tracking-tight">Anderson Tom</h1>
        <p className="text-xl text-muted-foreground font-medium">
          Web Developer, China
        </p>
      </div>

      <div className="text-xl leading-relaxed">
        I&apos;m a web developer from China.I am passionate about building
        innovative solutions and sharing my knowledge with others.My interests
        are reading, taking beautiful photos, watching sports, and learing new
        techs.You can get in touch with me by email:{" "}
        <a href="mailto:anderson.tom.programmer@gmail.com">
          anderson.tom.programmer@gmail.com
        </a>
      </div>
    </div>
  );
}
