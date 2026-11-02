import DetailNav from "../components/DetailNav";
import DetailFooter from "../components/DetailFooter";

import image2 from "/hospital/image2.png";
// OPTIONAL: export these screens from your presentation or Figma and add them near the [IMAGE] comments:
// Mi Expediente, Solicitudes (admin), Mis Documentos (employee), Historial (both views).

export default function Hospital() {
  return (
    <div className="overflow-x-hidden leading-relaxed text-lg lg:text-xl">
      <DetailNav />

      <div className="flex assistant text-justify flex-col pb-0 p-7 pt-20 lg:pb-0 lg:p-25">
        <div className="py-8 pt-10 lg:px-85">
          <div className="justify-between pb-2">
            <div
              className="text-left hyphens-none sinoreta pb-1 text-4xl md:text-5xl lg:text-[3rem] font-bold leading-tight w-fit"
              style={{ viewTransitionName: "project-title" }}
            >
              Hospital Management System
            </div>
            <div className="text-lg lg:text-xl pb-2">Digital Employee Record Platform</div>
          </div>
          <div className="text-sm lg:text-base">
            <div>
              Role: UI/UX Designer and Front-End Developer.
            </div>
            <div>
              Skills: HTML, CSS, Tailwind, React, Vite, TypeScript, Figma,
              Information Architecture.
            </div>
            <div>Timeline: Fall 2025.</div>
          </div>
        </div>
        <div className="lg:px-85">
          <hr />
        </div>

        <div className="pt-8 gap-40 lg:px-85 text-[1.1rem]">
          <div>
            <div className="font-bold pb-1 text-[1.3rem]">Overview</div>
            <div className="pb-6">
              Built for the Hospital Infantil del Estado de Sonora (HIES) in
              Hermosillo, this web platform
              replaces roughly 14,000 physical employee documents with a
              digital record for every staff member. Employees keep their own
              file up to date and administrators validate it. After our final
              presentation, another team took over deployment and adjustments
              so the hospital can put it into use.
            </div>

            <div className="font-bold pb-1 text-[1.3rem]">Problem</div>
            <div className="pb-6">
              With employee records on paper, staff lost a lot of time looking
              for the information they needed, and paperwork was easy to lose.
              We estimated that finding a single file took about a minute and
              a half. That slowed every operation that required checking a
              record, such as confirming an employee had the right
              certification and education to attend a patient, which delayed
              patients getting treated. Moving online meant more than
              digitizing the paper. The records needed a structure that made
              information quick to find and easy to keep current.
            </div>

            <div className="pb-6">
              Who it's for: every hospital employee, in two
              roles. Collaborators manage their own digital file:
              they upload, update and consult their documents through a guided
              process and can only access their own data. Administrators{" "}
              see every file, validate the documents employees upload, manage
              users and permissions, and keep a history of actions.
              <br />
              <br />
              How we learned what they needed: we met several
              times with the hospital team, who explained what they needed and
              what they wanted to fix. They also gave us Excel files with the
              information the platform had to organize and keep.
            </div>

            <div className="font-bold pb-1 text-[1.3rem]">Solution</div>
            <div className="pb-6">
              I designed the user flows and worked with my team on every
              screen. We didn't split screens between us. I also helped choose
              the color palette and fonts, and added the user flow to the Figma
              prototype so the screens are clickable. Three decisions shaped
              the structure:
              <br />
              <br />
                One profile per employee, managed by the employee.{" "}
                Each record holds an employee's personal data, academic
                information and documents. Letting people update their own
                file keeps information current, reduces the load on HR, and
                means each person only ever sees their own data.
              <br />
              <br />
                Uploaded documents are validated before they count.{" "}
                A new document goes to the admin's requests list, where it is
                accepted or rejected. Employees see each document's status
                (pending, approved or rejected) in their history, which keeps
                the official record traceable.
              <br />
              <br />
                Search by name or employee number. Admins can
                find a file with either one. Every employee has a unique
                employee number, which also tells apart people with the same
                name and is what they use to log in.
</div>
            <div className="pb-6">
              The whole interface is in Spanish because it was built for use at
              HIES. The back-end team added role-based access, token
              authentication, one-time passwords and AES-256 encryption, and an
              OCR team built a scanning module that fills in data from official
              ID documents with over 80% accuracy. Users validate scanned data
              before saving.
            </div>

            {/* [IMAGE] Solicitudes (admin) next to Mis Documentos (employee) */}
            {/* [IMAGE] Historial: admin view and employee view */}
            {/* [IMAGE] Mi Expediente (personal data and academic information, mock data) */}

            <div className="pb-6">
              On the front end, I built the employee information screen with
              React, TypeScript and Tailwind, and connected it to the backend
              data so it displays correctly. A teammate built the backend.
            </div>

            <figure className="pb-6">
              <div className="justify-center flex lg:block">
                <img
                  loading="lazy"
                  src={image2}
                  alt="Log in page of the Hospital Management System showing a form for staff to enter their credentials"
                />
              </div>
            </figure>

            <div className="font-bold pb-1 text-[1.3rem]">Outcome</div>
            <div className="pb-6">
              We presented the finished platform to HIES employees, who told us
              it exceeded their expectations. Based on our estimates, searching
              for a file drops from about 1.5 minutes on paper to as little as
              5 seconds in the system. We didn't run usability testing, and we
              worked with mock data rather than real records, since
              implementing it at the hospital wasn't our responsibility. The
              hospital is now moving toward using it in place of its paper
              system.
            </div>

            <div className="font-bold pb-1 text-[1.3rem]">Reflections</div>
            <div className="pb-6">
              This project taught me to treat interface design as a structural
              problem first. The hard part was deciding how records are
              organized, who can see and change them, and how they are found,
              not how they look. Working with hospital staff also showed me
              that a slow or confusing interface has consequences beyond
              frustration, because lost time here meant delays in patient
              treatment. Since we didn't test with employees, next time I would
              test with them before handoff.
            </div>
          </div>

          <iframe
            title="Figma prototype of the Hospital Management System"
            className="w-full aspect-video rounded-[.6rem] pb-6"
            src="https://www.figma.com/embed?embed_host=share&url=https://www.figma.com/design/bbn3hdxKPK45w4YRADn8DE/HIES?node-id=798-63&t=Yf2WuxQjrM1TfWae-1"
            allowFullScreen
          />
        </div>

        <div className="lg:px-85">
          <hr />
        </div>
        <DetailFooter />
      </div>
    </div>
  );
}