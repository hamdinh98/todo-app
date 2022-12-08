<?php
declare(strict_types=1);
namespace App\Document;
use Doctrine\ODM\MongoDB\Mapping\Annotations as ODM;
use Symfony\Component\Validator\Constraints as Assert;
/**
 *  @ODM\Document(repositoryClass="App\Repository\TaskRepository")
 */
class Task
{
    /** @ODM\Field(type="string")
     * @Assert\NotBlank(message = "title is required")
     */
    private string $title;
    /** @ODM\Id(type="string",strategy="AUTO") */
    private  string $id;
    /** @ODM\Field(type="string") */
    private string $note;
    /** @ODM\Field(type="string")
     ** @Assert\Choice({"todo", "in-progress", "done"}, message="Choose a valid status.")
     */
    private string $status;
    /** @ODM\Field(type="date") */
    //deadline
    private \DateTime $date;

    //make getter and setter to all attributes

    public function __construct(string $title, string $note, ?string $status, \DateTime $date)
    {
        //$this->id = $id;
        $this->title = $title;
        $this->note = $note;
        $this->status = $status;
        $this->date = $date;
    }
    public function oneArgConstructor(string $title)
    {
        $this->title = $title;
    }
    public function twoArgConstructor(string $title,string $note)
    {
        $this->title = $title;
        $this->note = $note;
    }
    public function threeArgConstructor(string $title,string $note,string $status)
    {
        $this->title = $title;
        $this->note = $note;
        $this->status = $status;
    }


    public function getId()
    {
        return $this->id;
    }

    public function getTitle(): string
    {
        return $this->title;
    }

    public function setTitle(string $title): void
    {
        $this->title = $title;
    }

    public function getNote(): string
    {
        return $this->note;
    }

    public function setNote(string $note): void
    {
        $this->note = $note;
    }

    public function getStatus(): string
    {
        return $this->status;
    }

    public function setStatus(string $status): void
    {
        $this->status = $status;
    }

    public function getDate():\DateTime
    {
        return $this->date;
    }


    public function setDate(\DateTime $date): void
    {
        $this->date = $date;
    }




}