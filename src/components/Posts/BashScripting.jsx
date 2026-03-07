import React, { useEffect } from "react";
import styled from "styled-components";

// helpers
import { Analytics } from "../../helpers/analytics";

// animations
import SlideInBottom from "../../animations/SlideInBottom";

// layout
import {
  PageWrapper,
  PostTopBar,
  PostContainer as BasePostContainer,
  HeaderRow,
  IconWrapper,
  HeaderIcon,
} from "../BlogLayout/BlogLayout";

// typography
import {
  PageTitle,
  SectionHeading,
  SubSectionHeading,
  TertiaryHeading,
  Paragraph,
  Strong,
  InlineHighlight,
  TextLink,
  TextList,
  TextListItem,
  IndentedTextListItem,
} from "../Typography/Typography";

// icons
import { BashSVG, DevOpsSVG } from "../../resources/styles/icons";

// components
import BackButton from "../Button/BackButton";
import Table from "../Table/Table";
import { CodeBlockWithCopy } from "../Code/Code";

// codeblocks
import {
  bashEnvironment,
  powershell,
  bashVersion,
  bashOutput,
  bashFeed,
  bashFeed2,
  bashFeedAlt,
  bashMixingMatching,
  bashRedirectErr,
  bashRedirectErr2,
  bashFileDescriptors,
  bashAppend,
  bashPipe,
  bashFirstScript,
  bashFirstScript2,
  bashFirstScript3,
  bashFirstScript4,
  pythonScript,
  bashProjectSetup,
  bashProjectSetup2,
  bashProjectSetup3,
  bashProjectSetup4,
  bashUserInput,
  bashCommandSubstitution,
  bashPassingArguments,
  bashPassingArguments2,
  bashPassingArguments3,
  bashSystemInfo,
  bashSystemInfo2,
  bashSystemInfo3,
  bashIf,
  bashIf2,
  bashIfElse,
  bashCombiningConditions,
  bashCaseStatement,
  bashForLoop,
  bashForLoop2,
  bashWhileLoop,
  bashWhileLoop2,
  bashUntilLoop,
  bashLoopExample,
  bashExplicitlyFail,
  bashFunctions,
  bashFailGracefully,
  bashSafeLogger,
  bashTinyLoggingHelper,
  bashTinyLoggingHelper2,
  bashReusableTemplate,
  bashTrap,
  bashDebugMode,
  bashDebugMode2,
  bashDebugMode3,
  bashTrapDebug,
  bashWildcardsText,
  bashHandlingExpectedFailures,
  bashHandlingExpectedFailures2,
  bashLoggingDebugOutput,
  bashLoggingDebugOutput2,
  bashNullGlob,
  bashWildcards,
  bashWildcards2,
  bashGrep,
  bashGrep2,
  bashSed,
  bashSed2,
  bashSed3,
  bashAwk,
  bashAwk2,
  bashAwk3,
  bashGrepSedAwk,
  bashGrepSedAwk2,
  bashCleaningCSVData,
  bashCleaningCSVData2,
  bashCleaningCSVData3,
  bashCleaningCSVDataText,
  bashPing,
  bashPing2,
  bashPing3,
  bashCurl,
  bashCurl2,
  bashCurl3,
  bashCurl4,
  bashCurl5,
  bashCurl6,
  bashCurl7,
  bashSCP,
  bashSCP2,
  bashNC,
  bashNC2,
  bashDig,
  bashDig2,
  bashDig3,
  bashMonitoring,
} from "../../helpers/codeblocks";

const PostContainer = styled(BasePostContainer)`
  animation: ${SlideInBottom} 0.5s forwards;
`;

const TocColumns = styled.div`
  display: flex;
  justify-content: space-evenly;
  gap: 2rem;

  @media only screen and (max-width: 700px) {
    flex-direction: column;
  }
`;

const BashScripting = () => {
  useEffect(() => {
    Analytics.event("blog_opened", { slug: "getting-started-with-bash-scripting" });
  }, []);

  const columns = ["Command", "Description", "Example"];
  const data = [
    { Command: "pwd", Description: "Prints the current directory", Example: "pwd" },
    { Command: "echo", Description: "Print text to the terminal", Example: 'echo "Please enter a number: "' },
    { Command: "ls", Description: "Lists files and directories", Example: "ls -l" },
    { Command: "cd", Description: "Changes directory", Example: "cd /etc" },
    { Command: "mkdir", Description: "Creates a new directory", Example: "mkdir projects" },
    { Command: "touch", Description: "Creates a new file", Example: "touch script.sh" },
    { Command: "mv", Description: "Moves or renames files", Example: "mv old.txt new.txt" },
    { Command: "cp", Description: "Copies files", Example: "cp file.txt backup.txt" },
    { Command: "rm", Description: "Deletes files", Example: "rm file.txt" },
  ];

  const columns2 = ["Flag", "What it checks", "Example"];
  const data2 = [
    { Flag: "-f", "What it checks": "File exists", Example: "[ -f file.txt ]" },
    { Flag: "-d", "What it checks": "Directory exists", Example: "[ -d myfolder ]" },
    { Flag: "-e", "What it checks": "File or directory exists", Example: "[ -e path ]" },
    { Flag: "-r", "What it checks": "Readable", Example: "[ -r file.txt ]" },
    { Flag: "-w", "What it checks": "Writable", Example: "[ -w file.txt ]" },
    { Flag: "-x", "What it checks": "Executable", Example: "[ -x script.sh ]" },
  ];

  const columns3 = ["Operator", "Meaning", "Example"];
  const data3 = [
    { Operator: "-eq", Meaning: "Equal", Example: "[ $a -eq $b ]" },
    { Operator: "-ne", Meaning: "Not equal", Example: "[ $a -ne $b ]" },
    { Operator: "-gt", Meaning: "Greater than", Example: "[ $a -gt $b ]" },
    { Operator: "-lt", Meaning: "Less than", Example: "[ $a -lt $b ]" },
    { Operator: "-ge", Meaning: "Greater or equal", Example: "[ $a -ge $b ]" },
    { Operator: "-le", Meaning: "Less or equal", Example: "[ $a -le $b ]" },
  ];

  const columns4 = ["Operator", "Meaning", "Example"];
  const data4 = [
    { Operator: "&&", Meaning: "AND", Example: "[ $a -gt 5 ] && [ $b -lt 10 ]" },
    { Operator: "!", Meaning: "NOT", Example: "[ ! -f file.txt ]" },
  ];

  return (
    <PageWrapper>
      <PostTopBar>
        <BackButton to="/blog" />
      </PostTopBar>

      <PostContainer>
        <HeaderRow>
          <PageTitle>Getting Started with Bash Scripting</PageTitle>
          <IconWrapper>
            <HeaderIcon>
              <DevOpsSVG />
            </HeaderIcon>
            <HeaderIcon>
              <BashSVG />
            </HeaderIcon>
          </IconWrapper>
        </HeaderRow>

        <Paragraph>
          When you first start working in the command line, it can feel like stepping into a different world - one where
          you're talking directly to your computer instead of clicking buttons. It's intimidating at first, but once you
          realise how much power sits behind a few keystrokes, it's addictive. In this post, we're going to start from the very
          beginning. We'll cover what Bash actually is, how to get set up, and then we'll move into writing our first few
          scripts. By the end, you'll be automating small tasks and understanding how your system works under the hood. Feel
          free to skip to any section:
        </Paragraph>

        <TextList>
          <TextListItem>
            <TextLink href="#what-is-bash">What is Bash?</TextLink>
          </TextListItem>
          <TextListItem>
            <TextLink href="#bash-vs-command-line">Bash vs. the Command Line - What's the Difference?</TextLink>
          </TextListItem>
          <TextListItem>
            <TextLink href="#getting-comfortable-in-the-terminal">Getting Comfortable in the Terminal</TextLink>
          </TextListItem>
          <TextListItem>
            <TextLink href="#setting-up-your-environment">Setting up Your Environment</TextLink>
          </TextListItem>
          <TextListItem>
            <TextLink href="#writing-your-first-script">Writing Your First Script</TextLink>
          </TextListItem>
          <TextListItem>
            <TextLink href="#redirecting-and-chaining-commands">Redirecting and Chaining Commands</TextLink>
          </TextListItem>
          <TextListItem>
            <TextLink href="#setting-up-a-project-folder">Setting up Your Environment</TextLink>
          </TextListItem>
          <TextListItem>
            <TextLink href="#logic-conditions-loops">Logic, Conditions, and Loops</TextLink>
          </TextListItem>
          <TextListItem>
            <TextLink href="#using-variables-and-user-input">Using Variables and User Input</TextLink>
          </TextListItem>
          <TextListItem>
            <TextLink href="#command-substitution">Command Substitution</TextLink>
          </TextListItem>
          <TextListItem>
            <TextLink href="#passing-arguments">Passing Arguments</TextLink>
          </TextListItem>
          <TextListItem>
            <TextLink href="#building-something-useful">Building Something Useful: A System Info Script</TextLink>
          </TextListItem>
          <TextListItem>
            <TextLink href="#functions-exit-codes-error-handling">Functions, Exit Codes, and Error Handling</TextLink>
          </TextListItem>
          <TextListItem>
            <TextLink href="#how-to-debug-and-troubleshoot-bash-scripts">How to Debug and Troubleshoot Bash Scripts</TextLink>
          </TextListItem>
          <TextListItem>
            <TextLink href="#data-manipulation-and-text-transformation">Data Manipulation and Text Transformation</TextLink>
          </TextListItem>
          <TextListItem>
            <TextLink href="#networking-with-bash">Networking with Bash</TextLink>
          </TextListItem>
        </TextList>

        <SectionHeading id="what-is-bash">What is Bash?</SectionHeading>
        <Paragraph>
          Bash stands for Bourne Again Shell. It's the most common command-line interpreter for Linux and macOS (and available
          for Windows through WSL or Git Bash). When you open your terminal, you're actually talking to Bash - giving it
          commands and seeing responses. It's what runs when you type things like ls, cd, or cat. But Bash isn't just an
          interface for commands - it's also a full scripting language. That means you can write scripts to automate almost
          anything you can do manually in the terminal.
        </Paragraph>

        <SectionHeading id="bash-vs-command-line">Bash vs. the Command Line - What's the Difference?</SectionHeading>
        <Paragraph>
          Before we go any further, it's worth clearing up a common mix-up:{" "}
          <Strong>Bash isn't the same thing as the command line</Strong>. The{" "}
          <InlineHighlight>command line (or terminal)</InlineHighlight> is simply the window or interface where you type commands - it's
          the tool that lets you interact with your system through text rather than a graphical interface. The{" "}
          <InlineHighlight>shell</InlineHighlight>, on the other hand, is the{" "}
          <Strong>program that actually interprets those commands</Strong>. Bash is just one type of shell - others include{" "}
          <Strong>Zsh</Strong>, and <Strong>PowerShell</Strong> (on Windows). They all serve the same purpose: read what
          you type, execute it, and print the result. So when you're working in Bash, you're still using the command line -
          you've just chosen Bash as the <InlineHighlight>language</InlineHighlight> your terminal understands.
        </Paragraph>
        <SectionHeading id="setting-up-your-environment">Setting up Your Environment</SectionHeading>
        <Paragraph>
          If you're on Linux or macOS, you already have Bash installed. For Windows users, you can enable the Windows Subsystem
          for Linux (WSL) or use Git Bash for a lightweight option.
          To confirm Bash is available, open your terminal and run:
          <CodeBlockWithCopy code={bashEnvironment} language="bash" />
          If you're using PowerShell, this command probably won't print anything - and that's normal. PowerShell isn't Bash, so
          it doesn't use the $SHELL environment variable. Instead, try this in PowerShell to check your current shell:
          <CodeBlockWithCopy code={powershell} language="powershell" />
          If you see entries like <Strong>PSEdition</Strong> or <Strong>PSVersion</Strong>, you're in PowerShell.
          <SubSectionHeading>A Quick Note on Windows Terminals</SubSectionHeading>
          If you're on Windows, it's worth knowing that there are three different command-line environments, and they don't all
          speak the same language.
          <TextList>
            <TextListItem>
              <Strong>Command Prompt (cmd.exe)</Strong> - This is the classic Windows terminal. It understands only old-style
              Windows commands (dir, copy, del, etc.). It can't run Bash or PowerShell commands.
            </TextListItem>
            <TextListItem>
              <Strong>PowerShell</Strong> - This is Microsoft's more modern shell. It uses its own scripting language
              (completely different from Bash) and can do much more with objects and automation on Windows systems.
            </TextListItem>
            <TextListItem>
              <Strong>Bash</Strong> - This is the Linux-style shell that understands Unix commands (ls, grep, cd, etc.). You
              can use it on Windows through WSL or Git Bash.
            </TextListItem>
          </TextList>
          So if you open cmd.exe and type bash or pwsh, it might not recognise those commands - because cmd isn't aware of the
          other shells.
          To work in Bash properly, open Git Bash or Ubuntu (WSL) instead. That gives you a full Linux-like environment where
          all the examples in this tutorial will work exactly as shown.
          Once you're inside Bash, run:
          <CodeBlockWithCopy code={bashVersion} language="bash" />
          That's it. No heavy setup required. You're ready to go.
        </Paragraph>
        <SectionHeading id="getting-comfortable-in-the-terminal">
          Getting Comfortable in the Terminal
        </SectionHeading>
        <Paragraph>
          Before jumping into scripting, let's make sure we're fluent in the basic building blocks of the command line. These
          are the verbs of Bash - the small, single-purpose commands that, when combined, become incredibly powerful.
        </Paragraph>
        <Table columns={columns} data={data} />
        <Paragraph>
          These might feel trivial at first, but understanding them deeply is key - every script you'll ever write will build
          on these fundamentals.
        </Paragraph>

        <SectionHeading id="writing-your-first-script">Writing Your First Script</SectionHeading>
        <Paragraph>
          Let's go classic for a moment. Create a file called hello.sh:
          <CodeBlockWithCopy code={bashFirstScript} language="bash" />
          Give it permission to run:
          <CodeBlockWithCopy code={bashFirstScript2} language="bash" />
          Then execute it:
          <CodeBlockWithCopy code={bashFirstScript3} language="bash" />
          Output:
          <CodeBlockWithCopy code={bashFirstScript4} language="bash" />
          It's a small win, but it's the moment most developers realise - "wait, I can make my computer do things for me."
        </Paragraph>
        <SubSectionHeading>A Quick Note on Shebang</SubSectionHeading>
        <Paragraph>

          That first line - #!/bin/bash - is called the shebang (sometimes written as "hashbang"). It tells your system which
          interpreter should be used to run the script. When you execute a script directly (like ./hello.sh), the operating
          system looks at that line and says: "Ah, this file should be run using Bash, which lives at /bin/bash." If you were
          writing a Python script, it might look like this instead:
          <CodeBlockWithCopy code={pythonScript} language="python" />
          Without the shebang, the system doesn't automatically know which program should interpret your code - meaning your
          script might fail or behave differently depending on the environment. It's a small line, but it's the reason Bash
          scripts "just work" when shared across systems.
        </Paragraph>
        <SectionHeading id="redirecting-and-chaining-commands">Redirecting and Chaining Commands</SectionHeading>
        <Paragraph>
          One of the most useful things Bash can do is connect commands together. This is where redirection and pipes come in.
        </Paragraph>
        <Paragraph>
          Bash can take the output of one command and feed it into another. That's what the | symbol (the pipe) is for. Bash
          actually has a three-way system for how it handles data:
          <TextList>
            <TextListItem>
              <Strong>stdin</Strong> standard input (what the command reads)
            </TextListItem>
            <TextListItem>
              <Strong>stdout</Strong> standard output (what it prints)
            </TextListItem>
            <TextListItem>
              <Strong>stderr</Strong> standard error (where it reports problems)
            </TextListItem>
          </TextList>
          Every time you run a command, Bash quietly connects these three data streams in the background.
        </Paragraph>
        <SubSectionHeading>
          Sending Output Somewhere Else - {`>`} and {`>>`}
        </SubSectionHeading>
        <Paragraph>
          Let's say you want to save the output of a command to a file instead of printing it to the screen. You can do that
          like this:
          <CodeBlockWithCopy code={bashOutput} language="bash" />
          That line tells Bash: "take the normal output of ls and write it into a file instead of the screen." If the file
          already exists, it gets replaced.
          <CodeBlockWithCopy code={bashAppend} language="bash" />
          <SubSectionHeading>
            Feeding Input into a Command - {`<`}
          </SubSectionHeading>
          This one works in the opposite direction. It takes the contents of a file and feeds it into a command as if you were
          typing it manually. That command reads everything from names.txt, sorts it alphabetically, and prints the result to
          the screen.
          <CodeBlockWithCopy code={bashFeed} language="bash" />
          So at first glance it seems redundant - but here's where it becomes useful:
          Sometimes you need to pass input to commands that don't normally take filenames directly. Let's say you have a text
          file with a list of users and you want to run a command for each one. You could do this:
          <CodeBlockWithCopy code={bashFeed2} language="bash" />
          That {`<`} users.txt at the end means, "feed the contents of this file into the loop as standard input." It's elegant
          and clean - the loop reads line by line until it runs out of data. Without {`<`}, you'd have to pipe or cat it, which
          works but looks messier:
          <CodeBlockWithCopy code={bashFeedAlt} language="bash" />
          Both achieve the same result, but the version with {`<`} avoids creating an unnecessary pipe process (which we will
          visit soon). It's a small detail, but a sign of well-written Bash.
          <SubSectionHeading>Redirecting Errors - {`2>`}</SubSectionHeading>
          We will be covering exit codes and error handling in more detail but we'll briefly cover it here as it's relevant.
          By default, Bash sends normal output (stdout) and error messages (stderr) to the same place: your terminal.
          Sometimes, though, you want to separate them.
          <CodeBlockWithCopy code={bashRedirectErr} language="bash" />
          This tells Bash:
          <TextList>
            <TextListItem>Write all the successful output into results.txt</TextListItem>
            <TextListItem>
              Send all error messages (like 'permission denied') into errors.txt
            </TextListItem>
          </TextList>
          The 2 refers to the file descriptor for stderr. You can also redirect both streams into one file:
          <CodeBlockWithCopy code={bashRedirectErr2} language="bash" />
          That 2{`>`}&1 means, "send stderr to wherever stdout is currently going." It's the kind of syntax that looks like
          gibberish at first, then suddenly makes sense the first time you debug a failing script.
          <SubSectionHeading>The Pipe - |</SubSectionHeading>
          You can also pipe commands together. This lets you take the output of one command and feed it directly into another:
          <CodeBlockWithCopy code={bashPipe} language="bash" />
          Here, the ls command lists everything, but instead of printing it to the screen, it hands the list straight to grep,
          which filters it for lines containing "log." The result is printed out as if it came from one command. You can keep
          chaining pipes indefinitely.
          <SubSectionHeading>Mixing and Matching</SubSectionHeading>
          Once you understand that {`<`}, {`>`}, and | are just ways to control where data flows, you can combine them in
          creative ways.
          <CodeBlockWithCopy code={bashMixingMatching} language="bash" />
          This reads from input.txt, sorts the lines, removes duplicates, and saves the result to cleaned.txt. No intermediate
          files, no temporary steps - just a single pipeline that flows cleanly from left to right.
          <SubSectionHeading>File Descriptors</SubSectionHeading>
          Behind the scenes, Bash treats all input and output as file descriptors. You've already met three of them:
          <TextList>
            <TextListItem>0 = standard input</TextListItem>
            <TextListItem>1 = standard output</TextListItem>
            <TextListItem>2 = standard error</TextListItem>
          </TextList>
          You can open and close these manually if you ever need to redirect input or output dynamically. For example:
          <CodeBlockWithCopy code={bashFileDescriptors} language="bash" />
          That opens a new "output stream" to log.txt, writes a line to it, and then closes it. It's an advanced technique, but
          once you start writing more complex scripts - like logging functions or multi-stream tools - it gives you total control
          over what goes where.
        </Paragraph>
        <SectionHeading id="setting-up-a-project-folder">
          A Quick Automation: Setting Up a Project Folder
        </SectionHeading>
        <Paragraph>
          Let's create our first piece of automation - a small script that sets up a basic project directory structure. We'll
          call it setup_project.sh, and it'll generate this structure:
          <CodeBlockWithCopy code={bashProjectSetup} language="bash" />
          Here's the script:
          <CodeBlockWithCopy code={bashProjectSetup2} language="bash" />
          Make it executable:
          <CodeBlockWithCopy code={bashProjectSetup3} language="bash" />
          Then run it:
          <CodeBlockWithCopy code={bashProjectSetup4} language="bash" />
          And just like that, Bash created your project skeleton in seconds. You'll start to see how even small bits of
          automation can save time - and prevent the "new project setup" fatigue.
        </Paragraph>
        <SectionHeading id="using-variables-and-user-input">Using Variables and User Input</SectionHeading>
        <Paragraph>
          Bash supports variables like any other language. They're simple - no types, no declarations - just a name and a value.
          <CodeBlockWithCopy code={bashUserInput} language="bash" />
          Notice how you can mix hard-coded values and user input in the same script. This opens the door to building small
          utilities that can interact with users or gather system data.
        </Paragraph>
        <SectionHeading id="command-substitution">Command Substitution</SectionHeading>
        <Paragraph>
          Another handy trick - storing the result of a command in a variable.
          <CodeBlockWithCopy code={bashCommandSubstitution} language="bash" />
          You can use this technique to dynamically pull system information or chain results between commands. It's one of those
          small things that suddenly makes scripts feel alive.
        </Paragraph>
        <SectionHeading id="passing-arguments">Passing Arguments</SectionHeading>
        <Paragraph>
          You can also pass arguments directly to your script:
          <CodeBlockWithCopy code={bashPassingArguments} language="bash" />
          Try it:
          <CodeBlockWithCopy code={bashPassingArguments2} language="bash" />
          Output:
          <CodeBlockWithCopy code={bashPassingArguments3} language="bash" />
          This becomes essential when you start writing reusable automation scripts - like a backup tool that accepts different
          file paths as input.
        </Paragraph>
        <SectionHeading id="building-something-useful">
          Building Something Useful: A System Info Script
        </SectionHeading>
        <Paragraph>
          Let's tie everything together with something you might actually use. We'll create a script that prints out a quick
          system health summary - your hostname, user, uptime, memory, and disk usage.
          <CodeBlockWithCopy code={bashSystemInfo} language="bash" />
          Run it:
          <CodeBlockWithCopy code={bashSystemInfo2} language="bash" />
          Output:
          <CodeBlockWithCopy code={bashSystemInfo3} language="bash" />
          It's not exactly mind blowing, but it's a start - let's keep building.
        </Paragraph>
        <SectionHeading id="logic-conditions-loops">Logic, Conditions, and Loops</SectionHeading>
        <Paragraph>
          Once you're comfortable running a few commands, the next step is to make your scripts respond. You'll add logic, make
          decisions, and repeat actions automatically.
          We'll cover:
          <TextList>
            <TextListItem>Conditional statements (if, elif, else)</TextListItem>
            <TextListItem>Logical operators (&&, ||, !)</TextListItem>
            <TextListItem>File testing (-f, -d, etc.)</TextListItem>
            <TextListItem>For, While, and Until loops</TextListItem>
          </TextList>
          <SubSectionHeading>Making Decisions with if</SubSectionHeading>
          At some point, your script will need to make a choice. For example: "Does this file exist?", or "Did the user provide
          an argument?". That's where the if statement comes in. Here's the structure:
          <CodeBlockWithCopy code={bashIf} language="bash" />
          Let's start simple:
          <CodeBlockWithCopy code={bashIf2} language="bash" />
          The square brackets are a test ([ ... ]). -f checks whether the given path is a regular file. Replace it with -d for
          directories or -r for readability. You can combine conditions with && (and), || (or), or negate them with !.
          Soon you'll find yourself using these checks to protect against bad input or missing files.
          There are other useful tests too:
          <Table columns={columns2} data={data2} />
          <SubSectionHeading>Adding More Logic: elif and else</SubSectionHeading>
          You can extend your condition with multiple branches:
          <CodeBlockWithCopy code={bashIfElse} language="bash" />
          Here the comparisons (-gt, -lt, -eq) are Bash's way of saying greater-than, less-than, and equal. The structure reads
          almost like English once you get used to the spacing.
          <Table columns={columns3} data={data3} />
          <SubSectionHeading>Combining Conditions</SubSectionHeading>
          You can combine tests using logical operators:
          <CodeBlockWithCopy code={bashCombiningConditions} language="bash" />
          <Table columns={columns4} data={data4} />
          <SubSectionHeading>The Case Statement (Cleaner Branching)</SubSectionHeading>
          If you ever find yourself writing long chains of if and elif, a case statement can make things cleaner.
          <CodeBlockWithCopy code={bashCaseStatement} language="bash" />
          It's basically Bash's version of a switch statement - neat and readable.
          <SubSectionHeading>for Loop</SubSectionHeading>
          Used when you know how many times you want to repeat something - like iterating over files.
          <CodeBlockWithCopy code={bashForLoop} language="bash" />
          You can also loop through numbers:
          <CodeBlockWithCopy code={bashForLoop2} language="bash" />
          <SubSectionHeading>while Loop</SubSectionHeading>
          Runs as long as a condition is true:
          <CodeBlockWithCopy code={bashWhileLoop} language="bash" />
          You'll often use while loops to read files or process input dynamically:
          <CodeBlockWithCopy code={bashWhileLoop2} language="bash" />
          <SubSectionHeading>until Loop</SubSectionHeading>
          The inverse of while: runs until a condition becomes true.
          <CodeBlockWithCopy code={bashUntilLoop} language="bash" />
          <SubSectionHeading>Putting It All Together - A Mini Project</SubSectionHeading>
          Let's build something slightly more practical: a file cleanup script. This will loop through a directory and remove
          files older than a certain number of days.
          <CodeBlockWithCopy code={bashLoopExample} language="bash" />
          When you run it, the script asks which directory to clean, defaults to its own folder if you just press Enter, and
          removes files older than the number of days you give it.
          The magic line here is the one with find. It walks through every file under the chosen directory, checks when it was
          last modified, and if it's older than your cutoff, deletes it - printing each filename as it goes. It's a single,
          dense command that does the work of a whole GUI cleanup tool, and it runs in a fraction of a second.
        </Paragraph>
        <SectionHeading id="functions-exit-codes-error-handling">
          Functions, Exit Codes, and Error Handling
        </SectionHeading>
        <Paragraph>
          Functions are Bash's way of helping you stay organised. Instead of writing the same five lines again and again, you can
          wrap them up in a block, give it a name, and call it when you need it.
          Inside a function, the arguments you pass are stored in numbered variables: $1, $2, $3, and so on. They're positional -
          the first thing you pass is $1, the second is $2, etc. Bash doesn't enforce types or names; it's your job to remember
          what each one represents.
          Inside a function, you'll often see the keyword local. It's there to stop your temporary variables from leaking out and
          messing with the rest of the script. Bash doesn't isolate function scopes by default, so local is basically your
          guardrail.
          Every function also returns an exit status, just like any other Bash command. A return code of 0 means success, and any
          non-zero number signals some kind of failure. You can explicitly set this with return, but here's the trick; Bash
          functions can also output data. If you use echo inside a function, you can capture that output and use it elsewhere.
          That distinction keeps your scripts clean - echo sends information back, while return silently signals whether things
          went well.
          All examples use the same robust, path-safe patterns from earlier. If you're on Windows, run these in WSL or Git Bash.
          Here's a tiny example:
          <CodeBlockWithCopy code={bashFunctions} language="bash" />
          Here, sum prints its result to standard output, which we capture using command substitution $(...). validate_positive
          doesn't print anything - it simply exits with 0 or 1. The pattern is simple but powerful, and once you start using it
          consistently, your functions will behave predictably.
          <SubSectionHeading>Making Scripts Fail Gracefully</SubSectionHeading>
          By default, Bash is incredibly forgiving - maybe too forgiving. A command fails, and Bash just keeps going. That's fine
          for interactive use, but in automation it can lead to messy, half-finished jobs.
          You can change that behaviour with one line at the top of your script:
          <CodeBlockWithCopy code={bashFailGracefully} language="bash" />
          It's not as scary as it looks.
          <TextList>
            <TextListItem>
              <Strong>-e</Strong> means "exit immediately if any command fails."
            </TextListItem>
            <TextListItem>
              <Strong>-u</Strong> means "treat undefined variables as errors."
            </TextListItem>
            <TextListItem>
              <Strong>-o pipefail</Strong> means "if you chain commands with a pipe, the whole pipeline fails if any part of
              it fails."
            </TextListItem>
          </TextList>
          Together they turn Bash from a laid-back surfer into a careful engineer who refuses to move on when something breaks.
          If you want to allow a failure intentionally, you can still do it explicitly:
          <CodeBlockWithCopy code={bashExplicitlyFail} language="bash" />
          That one-liner says, run this command; if it fails, don't crash - just log a note.
          <SubSectionHeading>Cleaning Up After Yourself</SubSectionHeading>
          Every long-running script should leave things the way it found them. Temporary files, network mounts, locks - they all
          need cleaning up even if the script crashes halfway through. Bash gives you a built-in tool for that called trap.
          Think of it as a safety net. You define a function that does the cleanup, and then tell Bash, "whenever the script
          exits, no matter why, run this."
          <CodeBlockWithCopy code={bashTrap} language="bash" />
          Now, whether you press Ctrl + C or the script finishes normally, the temporary file disappears.
          <SubSectionHeading>Logging What Happens</SubSectionHeading>
          A script that runs silently is fine when it works, but when something goes wrong, you'll wish it had told you what it
          was doing. Adding timestamps and log levels turns guesswork into understanding.
          <CodeBlockWithCopy code={bashTinyLoggingHelper} language="bash" />
          You can even pipe these messages to a file so you have a written record of every run:
          <CodeBlockWithCopy code={bashTinyLoggingHelper2} language="bash" />
          Now every message gets printed and saved - one of those small details that makes debugging a week later much less
          painful.
          <SubSectionHeading>Building a Reliable Script Skeleton</SubSectionHeading>
          Once you've written a few scripts, you'll notice the same scaffolding appears again and again: a couple of set
          statements, a directory resolver, maybe a cleanup trap and a logger. Here's a template you can drop at the top of any
          serious Bash project:
          <CodeBlockWithCopy code={bashReusableTemplate} language="bash" />
          It's minimal but battle-tested. Every new script can start here and grow outward, confident that the basics - safety,
          logging, and cleanup - are already handled.
          <SubSectionHeading>Safe Log Archiver</SubSectionHeading>
          Let's finish with something real: a script that tidies up old log files. This one validates inputs, archives files
          older than a certain age, compresses them, logs every step, and works no matter where you run it from.
          <CodeBlockWithCopy code={bashSafeLogger} language="bash" />
          When you look inside the code, you'll notice a few clever bits. The mapfile command quietly reads the list of files
          returned by find into an array - it's clean and safe, even with filenames that contain spaces. Then there's tar -C "/"
          - that option tells tar to treat every path as absolute, so when you extract the archive later, everything goes back
          exactly where it came from.
          And see that small commented-out loop at the end? If you uncomment it, the script deletes the original files after
          archiving, effectively turning it into a move operation instead of a copy. I usually leave it off until I've verified
          that the archive looks good; it's the difference between a cautious script and a reckless one.
          When you run it, you'll watch each step logged as it happens - the directory being scanned, the files being packed, and
          finally a neat .tar.gz sitting in an archives/ folder right next to your script. The whole thing works quietly and
          predictably, and if something goes wrong, you'll know exactly why.
          That's what this part of the series is really about: taking all the moving pieces of Bash and turning them into
          something reliable. Functions give you structure, exit codes give you control, and error handling keeps your work
          honest. Together, they turn your scripts from quick hacks into tools you can actually depend on.
        </Paragraph>
        <SectionHeading id="how-to-debug-and-troubleshoot-bash-scripts">
          How to Debug and Troubleshoot Bash Scripts
        </SectionHeading>
        <Paragraph>
          Now we'll look into how to debug Bash scripts in real time, trace their execution, and use wildcards to work with
          complex sets of files. Once you understand how Bash expands patterns and how to watch its inner workings, writing
          reliable automation becomes much easier.
          <SubSectionHeading>Seeing Inside the Script</SubSectionHeading>
          When you're debugging, the first and easiest tool is <InlineHighlight>echo</InlineHighlight>. It sounds almost too simple, but
          printing a variable's value at the right moment often reveals everything you need to know. We've been using it
          throughout our examples but of course, it can get messy fast as you can see - you don't want to litter your code with
          echoes everywhere.
          That's where Bash's build-in tracing comes in.
          <SubSectionHeading>Running in Debug Mode</SubSectionHeading>
          You can ask Bash to show you every command it executes, line by line. The simplest way is to run your script like
          this:
          <CodeBlockWithCopy code={bashDebugMode} language="bash" />
          The -x flag prints each command as it's executed, with variables already expanded. It looks a little noisy, but it's
          brilliant for spotting logic errors, especially when conditions or loops aren't behaving.
          If you only want to trace part of a script, you can toggle it on and off inside the code itself:
          <CodeBlockWithCopy code={bashDebugMode2} language="bash" />
          That's great when you want to focus on one section without flooding your terminal with output.
          You can even customise the trace prefix with a special variable called var. This adds context to each debug line,
          which is a huge help in longer scripts.
          <CodeBlockWithCopy code={bashDebugMode3} language="bash" />
          Now, every line Bash prints during debugging shows the filename, line number, and function name - almost like stepping
          through code in an IDE.
          <SubSectionHeading>Using trap DEBUG</SubSectionHeading>
          If you want to go one level deeper, you can use the trap command with the DEBUG signal. This fires before every single
          command Bash runs, and it's handy when you need to log or audit behaviour.
          <CodeBlockWithCopy code={bashTrapDebug} language="bash" />
          When this is active, every command is printed right before it executes. It's like having a live narrator describing
          your script's every move. You wouldn't leave this on in production, but it's a lifesaver when you're trying to
          understand why something works locally but not in a cron job.
          <SubSectionHeading>Understanding Wildcards and Expansion</SubSectionHeading>
          Wildcards, or "globs", are another core part of Bash that can quietly trip you up until you understand how they
          expand. They let you match patterns in filenames without listing them all manually.
          The most common ones are:
          <TextList>
            <TextListItem>
              <Strong>*</Strong> matches any number of characters (including none)
            </TextListItem>
            <TextListItem>
              <Strong>?</Strong> matches a single character
            </TextListItem>
            <TextListItem>
              <Strong>[abc]</Strong> matches one character from the set inside the brackets
            </TextListItem>
            <TextListItem>
              <Strong>[!abc]</Strong> matches anything not in that set
            </TextListItem>
          </TextList>
          If you run ls *.log, Bash expands *.log into a list of files before the command even starts. It's not ls doing the
          filtering - Bash is. That's why these are called "globs" (short for global patterns).
          Here's a small demo that shows how wildcards behave:
          <CodeBlockWithCopy code={bashWildcards} language="bash" />
          You'll see <Strong>fileA.log</Strong> <Strong>fileB.log</Strong> printed - those filenames were expanded
          automatically by Bash.
          You can combine patterns, too:
          {bashWildcardsText} lists both <InlineHighlight>.jpg</InlineHighlight> and <InlineHighlight>.png</InlineHighlight> files in the same go.
          <SubSectionHeading>Escaping Wildcards</SubSectionHeading>
          Sometimes, though, you don't want Bash to expand a pattern - you just want to pass it literally (for example, to a
          grep or find command that expects the pattern). In those cases, you escape the characters so Bash leaves them alone.
          <CodeBlockWithCopy code={bashWildcards2} language="bash" />
          Now the shell prints *.log exactly as written, without expanding it.
          <SubSectionHeading>Diagnosing Common Problems</SubSectionHeading>
          When something goes wrong in Bash, it's almost always one of three things:
          <TextList>
            <TextListItem>
              <Strong>A variable is unset or empty</Strong>
            </TextListItem>
            <TextListItem>
              <Strong>A command is running in the wrong directory.</Strong>
            </TextListItem>
            <TextListItem>
              <Strong>A pattern isn't matching what you think it should.</Strong>
            </TextListItem>
          </TextList>
          You can protect against these with a few good habits. Always double-quote your variables ("$dir" instead of $dir),
          print them out when debugging, and use pwd at the start of critical operations to verify where you are.
          If a loop doesn't run, check whether the glob you're looping over actually expands to anything. Bash will silently
          skip a loop if the pattern doesn't match any files.
          <SubSectionHeading>Logging Debug Output</SubSectionHeading>
          If you've been following along from Part 3, you already have a simple logging function. You can easily adapt it to
          record debug-level messages too. For example:
          <CodeBlockWithCopy code={bashLoggingDebugOutput} language="bash" />
          You can even redirect debugging output from set -x into a file by using the BASH_XTRACEFD variable:
          <CodeBlockWithCopy code={bashLoggingDebugOutput2} language="bash" />
          Now, all your trace output goes neatly into debug.log instead of cluttering the screen.
          <SubSectionHeading>Where Wildcards and Debugging Meet</SubSectionHeading>
          Wildcards and debugging might seem unrelated, but they actually intersect in interesting ways. Many strange bugs come
          from unexpected globbing - Bash expanding a pattern into hundreds of files, or worse, no files at all.
          A simple trick is to enable the nullglob option temporarily:
          <CodeBlockWithCopy code={bashNullGlob} language="bash" />
          That tells Bash: if a pattern doesn't match anything, expand it to nothing instead of leaving it literal. It prevents
          accidental operations like rm *.log when there are no .log files around.
          Pair that with set -x, and you'll see exactly what Bash expands each pattern to. Once you see that output, you'll
          never look at a wildcard the same way again.
        </Paragraph>
        <SectionHeading id="data-manipulation-and-text-transformation">
          Data Manipulation and Text Transformation
        </SectionHeading>
        <Paragraph>
          This part is all about data manipulation - reading, transforming, and filtering text using Bash's most powerful tools:
          grep, sed, and awk. These three commands are the beating heart of Unix philosophy: small, sharp tools that each do one
          thing well. Together, they can reshape logs, extract patterns, and perform complex text transformations that would
          take pages of code in other languages.
          If you've ever looked at a giant log file or CSV and thought, "there's no way I'm sorting through this manually,"
          Bash has your back. You'll start by finding things (grep), then modifying them (sed), and finally shaping the results
          into something meaningful (awk).
          <SubSectionHeading>Finding Needles in Haystacks with grep</SubSectionHeading>
          The name grep stands for "Global Regular Expression Print" - which sounds technical, but it simply means search for
          text and print matching lines.
          <CodeBlockWithCopy code={bashGrep} language="bash" />
          That scans through your system log and prints every line containing the word error. You can make it case-insensitive
          with -i, show line numbers with -n, or search recursively through directories with -r.
          A few quick examples:
          <CodeBlockWithCopy code={bashGrep2} language="bash" />
          The -v flag is worth remembering - it's "invert match," meaning show me everything that does NOT match. If you've ever
          filtered a spreadsheet, grep feels like that - but lightning fast and infinitely scriptable.
          <SubSectionHeading>Editing on the Fly with sed</SubSectionHeading>
          If grep is how you find text, sed is how you change it. It stands for "stream editor" and that's exactly what it does
          - it reads text line by line, applies your edits, and prints the result.
          Here's the simplest form:
          <CodeBlockWithCopy code={bashSed} language="bash" />
          That command looks cryptic until you know the structure: s means "substitute", old is the pattern to match, and new is
          what to replace it with.
          By default, sed prints the modified text to the terminal. To overwrite the file directly, add the -i flag:
          <CodeBlockWithCopy code={bashSed2} language="bash" />
          The g at the end means "global" - replace all occurrences on each line, not just the first. If you've ever used
          find-and-replace in a text editor, this is the command-line version, except it works on thousands of files at once.
          You can also delete lines, insert new ones, or modify only those matching certain patterns:
          <CodeBlockWithCopy code={bashSed3} language="bash" />
          When you start chaining these together, sed becomes a kind of text Swiss Army knife - small, sharp, and surprisingly
          expressive.
          <SubSectionHeading>Slicing and Dicing with awk</SubSectionHeading>
          Now comes awk, the most misunderstood tool in Bash. While grep and sed deal with lines, awk deals with fields - chunks
          of data separated by spaces, commas, or other delimiters. It was made for analysing structured text long before
          spreadsheets existed.
          Let's look at a basic example:
          <CodeBlockWithCopy code={bashAwk} language="bash" />
          That prints the first and third column from every line in data.txt. $1 means "the first field," $2 is the second, and
          so on. By default, awk splits fields by spaces or tabs, but you can change that using -F (for "field separator"):
          <CodeBlockWithCopy code={bashAwk2} language="bash" />
          That one-liner prints the first two columns from a CSV file. You can also use simple logic inside awk:
          <CodeBlockWithCopy code={bashAwk3} language="bash" />
          This prints only the rows where the third column is greater than 80. That's the magic of awk: you can filter and format
          data in a single pass, without ever touching a spreadsheet or a Python script.
          <SubSectionHeading>Combining the Trio</SubSectionHeading>
          These tools shine brightest when you chain them together - each one doing one job in a pipeline. Here's a real-world
          example: imagine you're cleaning up a log file and want to count how many errors occurred today.
          <CodeBlockWithCopy code={bashGrepSedAwk} language="bash" />
          This:
          <TextList>
            <TextListItem>
              <Strong>Finds all lines containing today's date.</Strong>
            </TextListItem>
            <TextListItem>
              <Strong>Filters them down to those with "ERROR".</Strong>
            </TextListItem>
            <TextListItem>
              <Strong>Counts the number of matches.</Strong>
            </TextListItem>
          </TextList>
          In a single command, you've just turned thousands of log lines into a single number.
          Here's another:
          <CodeBlockWithCopy code={bashGrepSedAwk2} language="bash" />
          That finds all running nginx processes and prints their process ID ($2) and command name ($11). If you've ever debugged
          a web server, this is one of those little commands that earns its place in muscle memory.
          <SubSectionHeading>Example: Cleaning CSV Data</SubSectionHeading>
          Let's look at an example scenario which includes what we've learned. Say you have a messy CSV file full of user data:
          <CodeBlockWithCopy code={bashCleaningCSVData} language="bash" />
          You want to:
          <TextList>
            <TextListItem>
              <Strong>Remove entries with missing emails.</Strong>
            </TextListItem>
            <TextListItem>
              <Strong>Fix the broken email domains.</Strong>
            </TextListItem>
            <TextListItem>
              <Strong>Output just the valid names and addresses.</Strong>
            </TextListItem>
          </TextList>
          Here's one way to do it with a single pipeline:
          <CodeBlockWithCopy code={bashCleaningCSVData2} language="bash" />
          Let's break that down:
          <TextList>
            <TextListItem>
              <Strong>grep -E ".+@.+"</Strong> keeps only lines with an @ symbol - our quick "email present" check
            </TextListItem>
            <TextListItem>
              <Strong>sed 's/@example$/@example.com/'</Strong> fixes emails that were missing .com.
            </TextListItem>
            <TextListItem>
              <Strong>{bashCleaningCSVDataText}</Strong> skips the header row (NR {`>`} 1) and prints each name and email in a
              readable format.
            </TextListItem>
          </TextList>
          <CodeBlockWithCopy code={bashCleaningCSVData3} language="bash" />
          Clean, simple, and no spreadsheets required.
        </Paragraph>
        <SectionHeading id="networking-with-bash">Networking with Bash</SectionHeading>
        <Paragraph>
          The command line isn't just a local toolbox - it's also a full-featured networking workstation. From testing
          connections to calling APIs, Bash gives you direct control over how your system talks to others. In this section,
          you'll learn how to use Bash to:
          <TextList>
            <TextListItem>Check network connectivity</TextListItem>
            <TextListItem>Query servers and APIs</TextListItem>
            <TextListItem>Transfer files</TextListItem>
            <TextListItem>Monitor latency and response times</TextListItem>
          </TextList>
          By the end, you'll have a few short scripts that can check website uptime, test DNS resolution, and even pull live
          data from the internet - all from the shell.
          <SubSectionHeading>Testing Connectivity with ping</SubSectionHeading>
          The simplest test of network connectivity starts with one word:
          <CodeBlockWithCopy code={bashPing} language="bash" />
          ping sends small packets (ICMP echo requests) to the destination and waits for a reply. It tells you two things:
          whether the host is reachable, and how long the round trip takes.
          The -c flag limits how many times it runs:
          <CodeBlockWithCopy code={bashPing2} language="bash" />
          That sends exactly four pings, then stops - perfect for scripting. You can use this inside a script to check if a host
          is up:
          <CodeBlockWithCopy code={bashPing3} language="bash" />
          That one-liner &{`>`}/dev/null hides all the normal ping output, keeping things clean. It's a nice first layer in any
          network health check.
          <SubSectionHeading>Downloading Data with curl</SubSectionHeading>
          curl is the Swiss army knife of network tools. It can make HTTP requests, upload files, authenticate, and even handle
          APIs. If you've ever worked with cloud services or REST endpoints, curl is what you'll use most often.
          Start with something simple:
          <CodeBlockWithCopy code={bashCurl} language="bash" />
          That prints the HTML of the webpage straight to your terminal. Add -O (capital O) to save it to a file instead:
          <CodeBlockWithCopy code={bashCurl2} language="bash" />
          You can use it for APIs too:
          <CodeBlockWithCopy code={bashCurl3} language="bash" />
          That fetches a JSON response describing the user octocat. If you want to see the full request and response details
          (great for debugging), use:
          <CodeBlockWithCopy code={bashCurl4} language="bash" />
          You'll see headers, status codes, and timing info - everything you'd expect from a browser's "network" tab, but right
          in your terminal.
          <SubSectionHeading>Checking Website Availability</SubSectionHeading>
          You can build a quick website uptime checker using just curl and a little logic.
          <CodeBlockWithCopy code={bashCurl5} language="bash" />
          This runs silently (-s), discards the output (-o /dev/null), and prints only the HTTP status code (-w "{`http_code`}").
          It's the sort of quick check you could schedule in cron to alert you if a site suddenly goes offline.
          <SubSectionHeading>Fetching and Parsing API Data</SubSectionHeading>
          The magic starts when you combine curl with grep or jq to pull out meaningful info from an API. For instance, here's
          how to check the current price of Bitcoin using the public Coindesk API:
          <CodeBlockWithCopy code={bashCurl6} language="bash" />
          It's a one-liner that downloads JSON, filters for the "rate" field, and extracts just the number. With jq installed,
          you can make it even cleaner:
          <CodeBlockWithCopy code={bashCurl7} language="bash" />
          That's the beauty of Bash - it's not just a programming language, it's a glue language. It connects external tools
          together to do exactly what you need.
          <SubSectionHeading>Transferring Files with scp and rsync</SubSectionHeading>
          Once you're comfortable reading and writing over the network, the next step is sending data. scp (secure copy) and
          rsync are the go-to commands for moving files between machines.
          scp is simple and reliable:
          <CodeBlockWithCopy code={bashSCP} language="bash" />
          That securely copies backup.tar.gz to your remote server over SSH.
          rsync is smarter - it copies only what's changed:
          <CodeBlockWithCopy code={bashSCP2} language="bash" />
          The flags mean:
          <TextList>
            <TextListItem>
              <Strong>a</Strong> - archive mode (preserves permissions and timestamps)
            </TextListItem>
            <TextListItem>
              <Strong>v</Strong> - verbose
            </TextListItem>
            <TextListItem>
              <Strong>z</Strong> - compress during transfer
            </TextListItem>
          </TextList>
          This is how many developers deploy static sites - it's basically a one-line deployment script.
          <SubSectionHeading>Checking Ports and Network Services</SubSectionHeading>
          Sometimes a server is online but a specific service isn't responding.
          You can check ports directly with nc (netcat):
          <CodeBlockWithCopy code={bashNC} language="bash" />
          That tests whether port 22 (SSH) is open on example.com. You'll get a simple success or failure message - perfect for
          debugging connectivity issues. If you need to continuously watch a service, you can wrap that in a loop:
          <CodeBlockWithCopy code={bashNC2} language="bash" />
          That pings the web server every 10 seconds and reports the result. It's crude, but surprisingly useful when you're
          troubleshooting.
          <SubSectionHeading>Checking DNS Resolution</SubSectionHeading>
          When something goes wrong, DNS is often the culprit. You can check DNS records using dig or nslookup.
          For example:
          <CodeBlockWithCopy code={bashDig} language="bash" />
          This returns the IP address of your domain. Or, to check the mail (MX) records:
          <CodeBlockWithCopy code={bashDig2} language="bash" />
          If you're scripting, you can easily turn this into a simple diagnostic:
          <CodeBlockWithCopy code={bashDig3} language="bash" />
          That line quietly checks whether DNS is working before your script tries to hit an API - a small sanity check that
          saves a lot of confusion later.
          <SubSectionHeading>Putting It All Together</SubSectionHeading>
          Here's a compact example that ties these tools into a useful network monitoring script:
          <CodeBlockWithCopy code={bashMonitoring} language="bash" />
          Each run:
          <TextList>
            <TextListItem>Checks if the host responds to ping.</TextListItem>
            <TextListItem>Fetches its HTTP status code.</TextListItem>
            <TextListItem>Logs both with timestamps to network.log.</TextListItem>
          </TextList>
          Run it from cron every few minutes, and you've got a simple uptime monitor written entirely in Bash.
        </Paragraph>
      </PostContainer>
    </PageWrapper>
  );
};

export default BashScripting;
