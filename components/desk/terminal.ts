import type { Content } from "@/lib/content";
import { profile } from "@/lib/profile";
import { deskActions } from "./store";
import { plainLabel } from "./objects/common";

export type TermLine = { kind: "in" | "out" | "err" | "accent"; text: string };

const HELP: TermLine[] = [
  { kind: "accent", text: "available commands:" },
  { kind: "out", text: "  whoami        who is this guy" },
  { kind: "out", text: "  projects      list my projects" },
  { kind: "out", text: "  open <n>      open project n" },
  { kind: "out", text: "  skills        knowledge base" },
  { kind: "out", text: "  services      what I can build for you" },
  { kind: "out", text: "  contact       call / message / email" },
  { kind: "out", text: "  cv            download my CV" },
  { kind: "out", text: "  github        open my GitHub" },
  { kind: "out", text: "  lights | lamp | music" },
  { kind: "out", text: "  clear" },
];

export const WELCOME: TermLine[] = [
  { kind: "accent", text: "amakenzi-os v2.077 // tty1" },
  { kind: "out", text: "type 'help' and press enter" },
];

/**
 * Run one terminal command. Returns the lines to print, or "clear".
 * Side effects (opening panels, toggling lights) go through deskActions.
 */
export function runCommand(raw: string, content: Content): TermLine[] | "clear" {
  const input = raw.trim();
  const [cmd = "", ...args] = input.toLowerCase().split(/\s+/);
  const echo: TermLine = { kind: "in", text: input };
  if (!cmd) return [echo];

  const out = (...text: string[]): TermLine[] => [
    echo,
    ...text.map((t) => ({ kind: "out" as const, text: t })),
  ];

  switch (cmd) {
    case "help":
    case "?":
    case "man":
      return [echo, ...HELP];
    case "clear":
    case "cls":
      return "clear";
    case "whoami":
    case "about":
      return out(
        `${profile.name} // full-stack software engineer`,
        `${content.about.description}`,
        `loc: ${profile.location}`
      );
    case "ls":
    case "projects":
      return out(
        ...content.projects.map((p, i) => `  [${i + 1}] ${plainLabel(p.category)}`),
        "type 'open <n>' to open one"
      );
    case "open":
    case "cd": {
      const n = parseInt(args[0] ?? "", 10);
      if (n >= 1 && n <= content.projects.length) {
        deskActions.openProject(n - 1);
        return out(`opening ${plainLabel(content.projects[n - 1].category)}...`);
      }
      return [echo, { kind: "err", text: `usage: open 1..${content.projects.length}` }];
    }
    case "skills":
    case "stack":
      deskActions.openPc("skills");
      return out("mounting knowledge base...");
    case "services":
    case "hire":
      deskActions.openPc("services");
      return out("loading services...");
    case "experience":
    case "resume":
      deskActions.openPc("experience");
      return out("loading work history...");
    case "contact":
    case "call":
    case "email":
      deskActions.openContact();
      return out(`${profile.phoneDisplay}  //  ${profile.email}`);
    case "cv":
      window.open(profile.cv, "_blank", "noopener");
      return out("downloading cv...");
    case "github":
    case "git":
      window.open(profile.github, "_blank", "noopener");
      return out("opening github.com/atukenov");
    case "linkedin":
      window.open(profile.linkedin, "_blank", "noopener");
      return out("opening linkedin");
    case "lights":
      deskActions.toggleRoomLights();
      return out("toggling room lights");
    case "lamp":
      deskActions.toggleLamp();
      return out("click.");
    case "music":
    case "lofi":
      deskActions.toggleMusic();
      return out("♪ toggling lo-fi");
    case "date":
      return out(new Date().toString());
    case "echo":
      return out(input.slice(5));
    case "sudo":
      return [echo, { kind: "err", text: "nice try. this incident will be reported." }];
    case "exit":
    case "shutdown":
      deskActions.togglePower();
      return out("bye.");
    default:
      return [
        echo,
        { kind: "err", text: `command not found: ${cmd}. try 'help'` },
      ];
  }
}
