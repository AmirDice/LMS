import { db } from "@/lib/db"
import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation";
import { Settings } from "lucide-react";
import { TitleForm } from "@/app/(dashboard)/(routes)/teacher/courses/[courseId]/_components/title-form";
import { DescriptionForm } from "./_components/description-form";
import { ImageForm } from "./_components/image-form"

const CourseIdPage = async ({
    params
}: {
    params: {courseId: string}
}) => {

    const { userId } = auth();

    if (!userId){
        return redirect("/");
    }

    const course = await db.course.findUnique({
        where: {
            id: params.courseId
        }
    })

    if(!course){
        return redirect("/")
    }

    const requiredFields = [
        course.title,
        course.description,
        course.imageUrl,
        course.price,
        course.categoryId
    ];

    const totalFields = requiredFields.length;
    const completedFields = requiredFields.filter(Boolean).length

    const completionText = `(${completedFields}/${totalFields})`

    return (
        <div className="p-6">
            <div className="flex items-center justify-between">
                <div className="flex flex-col gap-y-2">
                    <h1 className="text-2xl font-medium">
                        Edit Course
                    </h1>
                    <span className="text-sm text-slate-700">
                        Complete all fields {completionText}
                    </span>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
                <div>
                    <div className="flex items-center gap-x-2">
                    <div className="inline-flex items-center justify-center p-2  border-red-600 bg-red-600 bg-opacity-20 rounded-full">
                        <Settings className="h-5 w-5 text-red-600" />
                        </div>
                        <h2 className="text-xl">
                            Customize your course
                        </h2>
                    </div>
                    <TitleForm 
                        initialData={course}
                        courseId={course.id}/>
                    <DescriptionForm
                        initialData={course}
                        courseId={course.id}/>
                    <ImageForm
                        initialData={course}
                        courseId={course.id}/>
                </div>
            </div>
        </div>
    )
}

export default CourseIdPage;