import React, { useEffect } from 'react';
import styled from 'styled-components';

// helpers
import { Analytics } from '../../helpers/analytics';

// animations
import SlideInBottom from '../../animations/SlideInBottom';

// icons
import { JavascriptSVG } from '../../resources/styles/icons';

// components
import BackButton from '../Button/BackButton';
import ArrayExplorer from '../ArrayExplorer/ArrayExplorer';
import { CodeBlockWithCopy } from '../Code/Code';

// layout
import {
  PageWrapper,
  PostTopBar,
  PostContainer as BasePostContainer,
  HeaderRow,
  IconWrapper,
  HeaderIcon,
} from '../BlogLayout/BlogLayout';

// typography
import {
  PageTitle,
  SectionHeading,
  SubSectionHeading,
  Paragraph,
  InlineHighlight,
  Strong,
  TextLink,
  TextList,
  TextListItem,
} from '../Typography/Typography';

// codeblocks
import {
  example,
  mapExample,
  mapExample2,
  forEachExample,
  filterExample,
  findExample,
  findExample2,
  everyExample,
  someExample,
  reduceExample,
} from '../../helpers/codeblocks';

const AnimatedPostContainer = styled(BasePostContainer)`
  animation: ${SlideInBottom} 0.5s forwards;
`;

const starWarsIndexExample = `const starWarsCharacters = [];
starWarsCharacters.push("Luke", "Leia", "Han");
console.log(starWarsCharacters[0]); // "Luke"`;

const lastElementExample = `const starWarsCharacters = ["Luke", "Leia", "Han"];
console.log(starWarsCharacters[starWarsCharacters.length - 1]); // "Han"`;

const JavaScriptArray = () => {
  useEffect(() => {
    Analytics.event('blog_opened', { slug: 'aws-javascript-arrays' });
  }, []);

  return (
    <PageWrapper>
      <PostTopBar>
        <BackButton />
      </PostTopBar>

      <AnimatedPostContainer>
        <HeaderRow>
          <PageTitle>JavaScript Arrays</PageTitle>
          <IconWrapper>
            <HeaderIcon>
              <JavascriptSVG />
            </HeaderIcon>
          </IconWrapper>
        </HeaderRow>

        <Paragraph>
          Do you ever find yourself forgetting what helper methods would be best
          to manipulate your data? In this blog post, we'll cover the basics
          of JavaScript arrays, including how to create them, access and modify
          their elements, and use built-in methods to manipulate them.
        </Paragraph>

        <Paragraph>
          But before we get into that, I'd just like to briefly tackle what
          an array is exactly and share some useful tips. If you're not new
          to JavaScript, you can probably{' '}
          <TextLink href="#skip">skip this part.</TextLink> Alternatively, you
          can go straight to the{' '}
          <TextLink href="#use-case">use case</TextLink> section, which can help
          you find the helper method that best suits your needs.
        </Paragraph>

        <SectionHeading>What is an Array?</SectionHeading>

        <Paragraph>
          <Strong>
            Arrays are technically objects which help with storing a collection
            of multiple data sets under a single variable name.
          </Strong>
        </Paragraph>

        <Paragraph>
          JavaScript arrays are incredibly versatile and can be used to create
          complex data structures and algorithms. Arrays can be created using
          the <Strong>Array</Strong> constructor or by using
          literal notation. The most common method is using literal notation,
          which involves enclosing a list of values in square brackets.
        </Paragraph>

        <Paragraph>Here is an example:</Paragraph>

        <CodeBlockWithCopy code={example} />

        <Paragraph>
          Notice that arrays can contain a mix of different data types (integers,
          objects, and even arrays themselves).
        </Paragraph>

        <Paragraph>
          JavaScript arrays are zero-indexed, which means they start at index{' '}
          <InlineHighlight>0</InlineHighlight>, the second index being{' '}
          <InlineHighlight>1</InlineHighlight> and so on.
        </Paragraph>

        <CodeBlockWithCopy code={starWarsIndexExample} />

        <Paragraph>
          If you're wanting to get the last element of an array, you can
          always get the length of the array minus 1.
        </Paragraph>

        <CodeBlockWithCopy code={lastElementExample} />

        <SectionHeading>Why Data Manipulation?</SectionHeading>

        <Paragraph>
          JavaScript arrays come with helper methods which assist with data
          manipulation. The reason why we need to manipulate data can be for
          several reasons: it could be because a front-end application needs it
          to be in a different format in order to easily display the data, or
          because we want the data to be more readable and understandable.
        </Paragraph>

        <SectionHeading id="skip">Helper Methods</SectionHeading>

        <Paragraph>
          Here are the helper methods that I'll be covering in this post:
        </Paragraph>

        <TextList>
          <TextListItem>
            <TextLink href="#map">map</TextLink>
          </TextListItem>
          <TextListItem>
            <TextLink href="#forEach">forEach</TextLink>
          </TextListItem>
          <TextListItem>
            <TextLink href="#filter">filter</TextLink>
          </TextListItem>
          <TextListItem>
            <TextLink href="#find">find</TextLink>
          </TextListItem>
          <TextListItem>
            <TextLink href="#every">every</TextLink>
          </TextListItem>
          <TextListItem>
            <TextLink href="#some">some</TextLink>
          </TextListItem>
          <TextListItem>
            <TextLink href="#reduce">reduce</TextLink>
          </TextListItem>
        </TextList>

        <SubSectionHeading id="map">Map</SubSectionHeading>

        <Paragraph>
          The <InlineHighlight>map</InlineHighlight> helper method is an
          iterative method, meaning it loops through each element in the array
          and <Strong>constructs a new array from the results.</Strong>
        </Paragraph>

        <Paragraph>
          This can be quite handy when we want to manipulate the data into a new
          structure. The example below shows how we can remove the labels from
          each element in the array and just show the key and value.
        </Paragraph>

        <CodeBlockWithCopy code={mapExample} />

        <Paragraph>
          It's also common to have conditions within a map function. For
          example, if you needed to specifically change an element within the
          array, you can set a condition. Let's say we need to amend our
          data set to only have British spelling.
        </Paragraph>

        <CodeBlockWithCopy code={mapExample2} />

        <Paragraph>
          I know this is a bit of a tedious example, and I am by no means
          recommending this approach, but I just want to easily demonstrate that
          you can manipulate data sets with conditions.
        </Paragraph>

        <SubSectionHeading id="forEach">forEach</SubSectionHeading>

        <Paragraph>
          The <InlineHighlight>forEach</InlineHighlight> helper method, much
          like <InlineHighlight>map</InlineHighlight>, is an iterative method;
          however, a key difference is the output does{' '}
          <Strong>not return a new array</Strong>.
        </Paragraph>

        <Paragraph>
          The <InlineHighlight>forEach</InlineHighlight> method is a cleaner way
          of writing a traditional <InlineHighlight>for</InlineHighlight> loop.
        </Paragraph>

        <CodeBlockWithCopy code={forEachExample} />

        <SubSectionHeading id="filter">Filter</SubSectionHeading>

        <Paragraph>
          The <InlineHighlight>filter</InlineHighlight> method is used to create
          a new array with all the elements that pass a certain condition. When
          iterating over each element it will return a boolean value (true or
          false) indicating whether the element should be included in the
          filtered array or not.
        </Paragraph>

        <Paragraph>Here is an example of filtering out all even numbers from an array:</Paragraph>

        <CodeBlockWithCopy code={filterExample} />

        <Paragraph>
          In this example, the callback function checks if the current number is
          odd by using the modulus operator (%) to check if it's divisible
          by 2 with a remainder. If the remainder is not 0, the number is odd
          and true is returned, so it is included in the{' '}
          <Strong>oddNumbers</Strong> array.
        </Paragraph>

        <SubSectionHeading id="find">Find</SubSectionHeading>

        <Paragraph>
          The <InlineHighlight>find</InlineHighlight> method is used to search
          an array for a <Strong>specific element</Strong> and{' '}
          <Strong>returns the first element</Strong> in the array that satisfies
          the given condition.
        </Paragraph>

        <Paragraph>
          Here is an example of using the find method to search an array for a
          specific element:
        </Paragraph>

        <CodeBlockWithCopy code={findExample} />

        <Paragraph>
          In this example, the callback function checks if the current number is
          greater than 3. The method then returns the first element in the array
          that satisfies this condition, which is 4. If no element satisfies the
          search condition, the method returns{' '}
          <InlineHighlight>undefined</InlineHighlight>.
        </Paragraph>

        <CodeBlockWithCopy code={findExample2} />

        <Paragraph>
          In this example, there is no element in the array greater than 10, so
          the method returns <InlineHighlight>undefined</InlineHighlight>.
        </Paragraph>

        <SubSectionHeading id="every">Every</SubSectionHeading>

        <Paragraph>
          The <InlineHighlight>every</InlineHighlight> method is used to test
          whether <Strong>all elements</Strong> in an array pass a certain
          condition or not. It returns a boolean value (true or false)
          indicating whether every element in the array satisfies the given
          condition.
        </Paragraph>

        <Paragraph>
          Here is an example of testing if all elements in the array have a
          length of less than 4:
        </Paragraph>

        <CodeBlockWithCopy code={everyExample} />

        <Paragraph>
          In this example, the callback function checks each element's
          length, and because the length of the string "Anakin" is bigger than 4,
          the return will be false despite the other elements satisfying the
          condition.
        </Paragraph>

        <SubSectionHeading id="some">Some</SubSectionHeading>

        <Paragraph>
          The <InlineHighlight>some</InlineHighlight> method is used to test
          whether <Strong>at least one element</Strong> in an array passes a
          certain condition or not. It returns a boolean value (true or false)
          indicating whether any element in the array satisfies the given
          condition.
        </Paragraph>

        <Paragraph>
          Here is an example of testing if there are any elements in the array
          that are odd:
        </Paragraph>

        <CodeBlockWithCopy code={someExample} />

        <Paragraph>
          In this example, the callback function performs a calculation on each
          element (checks to see if the number is divisible by 2) and returns
          true because there is one element that does not meet the condition (7).
        </Paragraph>

        <SubSectionHeading id="reduce">Reduce</SubSectionHeading>

        <Paragraph>
          The <InlineHighlight>reduce</InlineHighlight> method is used to{' '}
          <Strong>reduce the values of an array to a single value.</Strong> It
          iterates over an array and applies a function to each element of the
          array, accumulating the result as it goes along.
        </Paragraph>

        <Paragraph>
          Here is an example of using the reduce method to find the sum of an
          array of numbers:
        </Paragraph>

        <CodeBlockWithCopy code={reduceExample} />

        <Paragraph>
          In this example, the callback function takes two arguments, the{' '}
          <Strong>accumulator</Strong> and the{' '}
          <Strong>currentValue</Strong>. It returns the sum of
          the accumulator and the currentValue. The{' '}
          <InlineHighlight>reduce</InlineHighlight> method then accumulates the
          result of each iteration, starting with an initial value of 0.
        </Paragraph>

        <Paragraph>
          If no initial value is provided, the reduce method uses the first
          element of the array as the initial value, and starts iterating from
          the second element.
        </Paragraph>

        <SectionHeading id="use-case">Use Cases</SectionHeading>

        <Paragraph>I have an array, I would like to...</Paragraph>

        <ArrayExplorer />

        <SectionHeading>References</SectionHeading>

        <TextList>
          <TextListItem>
            <TextLink
              href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array"
              target="_blank"
              rel="noreferrer"
            >
              MDN - Array
            </TextLink>
          </TextListItem>
          <TextListItem>
            <TextLink
              href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map"
              target="_blank"
              rel="noreferrer"
            >
              MDN - Array.prototype.map()
            </TextLink>
          </TextListItem>
          <TextListItem>
            <TextLink
              href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach"
              target="_blank"
              rel="noreferrer"
            >
              MDN - Array.prototype.forEach()
            </TextLink>
          </TextListItem>
          <TextListItem>
            <TextLink
              href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter"
              target="_blank"
              rel="noreferrer"
            >
              MDN - Array.prototype.filter()
            </TextLink>
          </TextListItem>
          <TextListItem>
            <TextLink
              href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find"
              target="_blank"
              rel="noreferrer"
            >
              MDN - Array.prototype.find()
            </TextLink>
          </TextListItem>
          <TextListItem>
            <TextLink
              href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/every"
              target="_blank"
              rel="noreferrer"
            >
              MDN - Array.prototype.every()
            </TextLink>
          </TextListItem>
          <TextListItem>
            <TextLink
              href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some"
              target="_blank"
              rel="noreferrer"
            >
              MDN - Array.prototype.some()
            </TextLink>
          </TextListItem>
          <TextListItem>
            <TextLink
              href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce"
              target="_blank"
              rel="noreferrer"
            >
              MDN - Array.prototype.reduce()
            </TextLink>
          </TextListItem>
        </TextList>
      </AnimatedPostContainer>
    </PageWrapper>
  );
};

export default JavaScriptArray;